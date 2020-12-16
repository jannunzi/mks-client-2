import $ from "jquery";
import {format} from "mathjs";

const elements = [
  `root_IMD Reduction Active_High Pass Filter Coefficients`,
  `root_Normal Operation_High Pass Filter Coefficients`,
  `root_Basic Settings_Resume Delay`,
  `root_Pulse Edge Holdoff`,
  `root_Pulse Capture Window Time`
]

const onBlur = (e, w) => {
  const input = $(e.currentTarget)
  const value = input.val()
  const float = parseFloat(value)
  if(!isNaN(float)) {
    const engineering = format(float, {notation: 'engineering'})
    input.val(engineering)
  }
}

export default (parentComponent) => {
  setTimeout(() => {
    elements.forEach(element => {
      const parent = $(`[id="${element}"]`)
      const inputFields = parent.find("input")
      // console.log(eee)
      // debugger
      // const inputs = $(element)
      inputFields.each((index, input) => {
        input = $(input)
        input.blur(onBlur)
        const value = input.val()
        const float = parseFloat(value)
        if(!isNaN(float)) {
          const engineering = format(float, {notation: 'engineering'})
          input.val(engineering)
        }
      })
    })
  }, 250)
}
