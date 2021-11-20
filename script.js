const transactionUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inpuTransactionName = document.querySelector('#text')
const inpuTransactionAmount = document.querySelector('#amount')

console.log({ incomeDisplay, expenseDisplay, balanceDisplay })

let dummyTransactions = [
    { id: 1, name: 'Bolo', amount: -20 },
    { id: 2, name: 'Salário', amount: 300 },
    { id: 3, name: 'Torta', amount: -10 },
    { id: 4, name: 'Violão', amount: +150 }

]

const removeTransaction = ID => {

    console.log(ID)

    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)


    init()

}


const addTransactinoIntoDOM = transaction => {

    const operador = transaction.amount < 0 ? '-' : '+'
    const CSSClas = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOpperator = Math.abs(transaction.amount)
    const li = document.createElement('li')


    li.classList.add(CSSClas)
    li.innerHTML = `
    ${transaction.name} <span>${operador} R$ ${amountWithoutOpperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
     x
    </button>
    `
    transactionUL.append(li)
}

const updateBalenceValues = constValue = () => {

    const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount)

    const total = transactionsAmounts
        .reduce((acc, num) => acc + num, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0))
        .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`


    console.log(expense)

}


const init = () => {
    transactionUL.innerHTML = ''

    dummyTransactions.forEach(addTransactinoIntoDOM)

    updateBalenceValues()

}

init()


const generatID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()


    const transactionName = inpuTransactionName.value.trim()
    const transactionAmount = inpuTransactionAmount.value.trim()


    if (transactionName === '') {

        alert('Campo Nome não preenchido')
        return
    }

    if (transactionAmount === '') {

        alert('Campo Valor não preenchido')
        return
    }


    const transaction = {
        id: generatID(),
        name: transactionName,
        amount: Number(transactionAmount)
    }

    dummyTransactions.push(transaction)
    init()
    inpuTransactionName.value = ''
    inpuTransactionAmount.value = ''

})