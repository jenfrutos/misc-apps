import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const Screen = ({ value }) => {
    return (
        <text className="me-2">{value}</text>)
}

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const buttons = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const Calc = () => {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        result: 0
    })

    const handleNumbers = (e) => {
        e.preventDefault();
        const value = e.target.value;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                result: !calc.sign ? 0 : calc.result,
            });
        }
        console.log(calc.num);

    }

    const handleDecimals = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    }
    const handleSigns = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setCalc({
            ...calc,
            sign: value,
            result: !calc.result && calc.num ? calc.num : calc.result,
            num: 0,
        });
    }
    const handleEqual = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                        ? a - b
                        : sign === "X"
                            ? a * b
                            : a / b;
            setCalc({
                ...calc,
                result:
                    calc.num === "0" && calc.sign === "/"
                        ? "Can't divide with 0"
                        : toLocaleString(math(
                            Number(removeSpaces(calc.result)), Number(removeSpaces(calc.num)), calc.sign)),
                sign: "",
                num: 0,
            });
        }
    }

    const handleInvert = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            result: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
            sign: "",
        });
    }
    const handlePercent = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            result: (result /= Math.pow(100, 1)),
            sign: "",
        });
    }
    const handleReset = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            result: 0,
        });
    }

    return (
        <div className="content-container d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">Retro Calculator</h1>
            <div className="container calc py-2">
                <div className="calc-display">
                    <Screen value={calc.num ? calc.num : calc.result} />
                </div>
                <div className="calc-buttons">
                    {
                        buttons.flat().map((btn, i) => {
                            return (
                                <Button
                                    key={i}
                                    value={btn}
                                    className={
                                        btn === "=" ? "btn btn-danger calc-equal calc-btn"
                                        : btn === "C" ? "btn btn-secondary calc-btn"
                                        : "btn btn-dark calc-btn"}
                                    onClick={
                                        btn === "C"
                                        ? handleReset
                                        : btn === "+-"
                                        ? handleInvert
                                        : btn === "%"
                                        ? handlePercent
                                        : btn === "="
                                        ? handleEqual
                                        : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                        ? handleSigns
                                        : btn === "."
                                        ? handleDecimals
                                        : handleNumbers
                                    }>{btn}
                                </Button>
                            );
                        })
                    }
                </div>
            </div>
            <div className="mt-5 "><a className="help-link" href="https://www.sitepoint.com/react-tutorial-build-calculator-app/">Made with Tutorial</a></div>
        </div>
    )
}
export default Calc;