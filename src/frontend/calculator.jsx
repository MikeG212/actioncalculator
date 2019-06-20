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

                <label htmlFor="retirement-income">If you were to retire tomorrow, how much money would you want to enjoy on a monthly basis (after tax)?</label>
                <input type="number" name="desired-income" value={this.state.desiredIncome} onChange={
                    this.update('desiredIncome')
                } />
                <label htmlFor="current-age">How old are you now?</label>
                <input type="number" name="current-age" value={this.state.currentAge} onChange={
                    this.update('currentAge')
                } />
                <label htmlFor="retirement-age">How old do you want to be when you retire?</label>
                <input type="number" name="retirement-age" value={this.state.retirementAge} onChange={
                    this.update('retirementAge')
                } />
                <div onClick={this.calculate}>Show me the money!!</div>
                <h1>With inflation, you would need ${this.state.inflationAdjustedIncome}/ year</h1>
                <h1>In order to have enough money in retirement, you need to have a nest egg of at least ${this.state.nestEgg}</h1>
                <h1>Good luck! Are you sure that you're saving enough money?</h1>
                <p>*Assuming a 3% inflation rate, 5% withdrawal rate, and 30% tax bracket*</p>
            </div>


        );
    }
}
export default Calculator;