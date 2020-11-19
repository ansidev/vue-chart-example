const number = (min = 0, max) => Math.random() * (max - min) + min
const int = (min = 0, max) => Math.floor(number(min, max))

const array = (length, min = 0, max = 100000) => {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(number(min, max))
  }
  return arr
}

const label = (length, prefix = 'Dataset') => {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(`${prefix} ${i + 1}`)
  }
  return arr
}

const rgbaColor = () => {
  const alpha = 1.0
  return (
    'rgba(' +
        int(0, 255) +
        ', ' +
        int(0, 255) +
        ', ' +
        int(0, 255) +
        ', ' +
        alpha.toFixed(1) +
        ')'
  )
}

const dataset = (length, itemDataLength, labelPrefix = 'Dataset') => {
  const dataset = {}
  for (let i = 0; i < length; i++) {
    const label = `${labelPrefix} ${i + 1}`
    dataset[(i + 1).toString()] = {
      label,
      borderColor: rgbaColor(),
      fill: false,
      data: array(itemDataLength)
    }
  }
  return dataset
}

export default {
  number,
  array,
  label,
  rgbaColor,
  dataset
}
