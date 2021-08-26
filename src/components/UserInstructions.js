// both imports are for rendering LaTeX in this app
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { Table } from 'react-bootstrap';

// latex formatted strings to display to show users how to format their responses
const variableLatex = 'x'
const functionLatex = 'f(x)'
const derivativeLatex = 'f\'(x)'
const nestedDerivativeLatex = 'f\'(g(x))'
const indefiniteIntegralLatex = '\\int f(x) \\ dx'
const definiteIntegralLatex = '\\int_a^b f(x) \\ dx'
const sinLatex = '\\sin{x}'
const cosLatex = '\\cos{x}'
const tanLatex = '\\tan{x}'
const cscLatex = '\\csc{x}'
const secLatex = '\\sec{x}'
const cotLatex = '\\cot{x}'
const asinLatex = '\\sin^{-1}{x}'
const acosLatex = '\\cos^{-1}{x}'
const atanLatex = '\\tan^{-1}{x}'
const eLatex = 'e'
const piLatex = '\\pi'
const logLatex = '\\log{x}'
const lnLatex = '\\ln{x}'
const sqrtLatex = '\\sqrt{x}'

// component that explains to users how to correctly format their responses
// allows them to submit expressions representing complex math operations
const UserInstructions = () => {
    return (
        <div>
            <br />
            Use order of operations when specifying answer.
            <br />
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>syntax</th>
                  <th>operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>+</td>
                  <td>addition</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>subtraction</td>
                </tr>
                <tr>
                  <td>*</td>
                  <td>multiplication</td>
                </tr>
                <tr>
                  <td>/</td>
                  <td>division</td>
                </tr>
                <tr>
                  <td>**</td>
                  <td>exponent</td>
                </tr>
                <tr>
                  <td>( )</td>
                  <td>parentheses</td>
                </tr>
              </tbody>
            </Table>
            Use variables specified in problem.
            <br />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>format</th>
                        <th>interpretation</th>
                        <th>math representation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>x</td>
                        <td>variable x</td>
                        <td><TeX>{variableLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>f(x)</td>
                        <td>function f</td>
                        <td><TeX>{functionLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>Derivative(f(x), x)</td>
                        <td>derivative of f with x as input</td>
                        <td><TeX>{derivativeLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>Derivative(f(g(x)), g(x))</td>
                        <td>derivative of f with g(x) as input</td>
                        <td><TeX>{nestedDerivativeLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>Integral(f(x), x)</td>
                        <td>integral of f</td>
                        <td><TeX>{indefiniteIntegralLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>Integral(f(x), (x, a, b))</td>
                        <td>integral of f evaluated from range a to b</td>
                        <td><TeX>{definiteIntegralLatex}</TeX></td>
                    </tr>
                </tbody>
            </Table>
            <br />
            Pre-defined constants and functions to use
            <br />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>format</th>
                        <th>math representation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>E</td>
                        <td><TeX>{eLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>pi</td>
                        <td><TeX>{piLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>log(x)</td>
                        <td><TeX>{logLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>ln(x)</td>
                        <td><TeX>{lnLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>sqrt(x)</td>
                        <td><TeX>{sqrtLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>sin(x)</td>
                        <td><TeX>{sinLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>cos(x)</td>
                        <td><TeX>{cosLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>tan(x)</td>
                        <td><TeX>{tanLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>csc(x)</td>
                        <td><TeX>{cscLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>sec(x)</td>
                        <td><TeX>{secLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>cot(x)</td>
                        <td><TeX>{cotLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>asin(x)</td>
                        <td><TeX>{asinLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>acos(x)</td>
                        <td><TeX>{acosLatex}</TeX></td>
                    </tr>
                    <tr>
                        <td>atan(x)</td>
                        <td><TeX>{atanLatex}</TeX></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default UserInstructions