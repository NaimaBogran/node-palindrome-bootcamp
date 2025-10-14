//user enters a word
//api will do palindrome check
//client side will take users word and use api, then display result in DOM

document.querySelector('button').addEventListener('click', checkWord)

function checkWord(){
    const userWord = document.getElementById('userWord').value
    
    fetch(`/api?check=${userWord}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById('results').innerText = `The word ${data.userWord}, ${data.outcome} a palindrome`
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}