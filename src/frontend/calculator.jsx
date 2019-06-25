import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: .03,
            desiredIncome: "",
            currentAge: "",
            retirementAge: "",
            inflationAdjustedIncome: "",
            nestEgg: "",
        }

        this.futureValue = this.futureValue.bind(this);
        this.calculate = this.calculate.bind(this);
        this.update = this.update.bind(this);

    }

    futureValue(rate, nper, pmt, pv) {
        var pow = Math.pow(1 + rate, nper),
            fv;
        if (rate) {
            fv = (pmt * (1 + rate) * (1 - pow) / rate) - pv * pow;
        } else {
            fv = -1 * (pv + pmt * nper);
        }
        return fv.toFixed(2);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    calculate() {
        let rate = this.state.rate;
        let years = this.state.retirementAge - this.state.currentAge;
        let pmt = 0;
        let pv = this.state.desiredIncome / .7;

        let inflationAdjustedIncome = -1 * Math.floor(this.futureValue(rate, years, pmt, pv));
        let nestEgg = inflationAdjustedIncome * 20;

        this.setState({
            inflationAdjustedIncome: inflationAdjustedIncome,
            nestEgg: nestEgg
        });
    }

    render() {
        return (
            <div>

                <label htmlFor="retirement-income">
                    <p>If you were going to retire tomorrow, how much income would you want to enjoy on an annual basis (after tax)?
                    <input type="number" name="desired-income" value={this.state.desiredIncome} onChange={
                            this.update('desiredIncome')
                        } />
                    </p>
                </label>

                <label htmlFor="current-age">
                    <p>How old are you now?
                    <input type="number" name="current-age" value={this.state.currentAge} onChange={
                            this.update('currentAge')} />
                    </p>
                </label>
                <label htmlFor="retirement-age">
                    <p>How old do you want to be when you retire?
                     <input type="number" name="retirement-age" value={this.state.retirementAge} onChange={
                            this.update('retirementAge')
                        } />
                    </p>
                </label>
                <span className="button" onClick={this.calculate}>Show me the money!!</span>
                <h3>With inflation, you would need ${(this.state.inflationAdjustedIncome / 1000).toFixed(0)}K/ year</h3>
                <h3>You need a nest egg of at least ${(this.state.nestEgg / 1000000).toFixed(1)} M</h3>
                <h3>Good luck! Are you sure you're saving enough money?</h3>
                <p>*Assumes a 3% inflation rate, 5% withdrawal rate, and 30% tax bracket*</p>
            </div >


        );
    }
}
export default Calculator;