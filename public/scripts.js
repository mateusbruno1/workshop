
function onOff() {
  document
    .querySelector("#modal")
    .classList
    .toggle("hide")
  document
    .querySelector("body")
    .classList
    .toggle("hideScroll")
  document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
}
function checkFiels(event) {
  const valuesCheck = [
    "title",
    "image",
    "category",
    "description",
    "link",
  ]
  const isempty = valuesCheck.find(function (value) {
    const checkIfisString = typeof event.target[value].value === "string"
    const checkIfisEmpty = typeof event.target[value].value.trim
    if (checkIfisString && checkIfisEmpty) {
      return true;
    }
  })
  if (isempty) {
    event.preventDefault();
    alert("Por favor, Preencha todos os campos")
  }
}

