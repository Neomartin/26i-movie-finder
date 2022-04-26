console.time()
console.log('Hola mundo');
const number1 = 24;
const number2 = 456;
let result = 0;


function peticionDemorada (timeout) {

    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(`Hola usuario desde funcion DEMORADA`)
            // reject(`No se resolvió la PROMESA`)
        }, timeout)
    })
    
}


peticionDemorada(4000)
    .then((resp)=> {
        console.log('demorado', resp)
        peticionDemorada(3000)
            .then((resp)=> {
                console.warn(resp)
                peticionDemorada(1000)
                    .then((resp) => console.info(resp))
                    .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))




result = Math.pow(number1, 2) / number2;
localStorage.setItem('mathResult', JSON.stringify(result))
console.log(`El resultado de la operacion matemática es ${result}`)

const array = [ 1,5,76,8,7,89,9,]
array.forEach(n => console.log(n))

console.log(`termino el bucle nfor`)
console.timeEnd()
