<template>
 <main class="container">
    <header>
      <h1 class="title">Password Generator</h1>
    </header>
    <section class="password__copy">
      <span id="showPassword">{{ password }}</span><img @click="copyPassword" src="../assets/images/icon-copy.svg" alt="Icon copy" id="btnCopy">
    </section>

    <section class="password__opcion">
      <div class="character__length">
        <label for="range">Character Length</label> <span id="numRange">{{ valueRange }}</span>
        <input 
         type="range" 
         id="range" 
         name="range" 
         min="4" 
         max="20" 
         v-model="valueRange" 
         @input="changeColorBar"
         :style="{ background: colorBarBg }"
         >
      </div>

      <div class="container__checkbox" >
        <label :for="check.id" v-for="(check, index) in checkboxs" :key="index">
          <input 
            type="checkbox" 
            :id="check.id" 
            :name="check.name" 
            v-model="check.checked"
            >
          <span class="checkmark"></span>
          {{ check.text }}
        </label>
      </div>

      <div class="password__result">
        <span>Strength</span> 
        <div class="container__bars">
          <span id="textSecurity">{{  textDiv }}</span>
          <div v-for="(checkbox ,index) in checkboxs" :key="index" class="bar" :style="{ backgroundColor: getColor(index) }"></div>
        </div>
      </div>
      <button id="generate" class="generator" @click="generatePassword">Generate <span class="img__arrow"></span><!-- <img class="icono" src="./assets/images/icon-arrow-right.svg" alt="icon of button"> --></button>
    </section>
  </main>
</template>

<script>
export default {
    data() {
        return {
            password: 'pjGT35?¡',
            textDiv: '',
            checkboxs : [
                { id: 'uppercaseLetter', name: 'uppercaseLetter', text: 'Include Uppercase Letters', checked: false },
                { id: 'lowercaseLetter', name: 'lowercaseLetter', text: 'Include Lowercase Letters', checked: false },
                { id: 'numbers', name: 'numbers', text: 'Include Numbers', checked: false },
                { id: 'symbols', name: 'symbols', text: 'Include Symbols', checked: false },
            ],
            valueRange: 10,
            colorBarBg: '#linear-gradient(to right, #A4FFAF 50%, #18171F 50%)',
            divColor: [ '#F64A4A', '#FB7C58', '#F8CD65', '#A4FFAF', '#18171F'],
            divText: [ 'Took Weak!', 'Weak', 'Medium', 'Strong', ''],
        }
    },
    computed: {
        /* Se obtiene los checkbox selecionados */
        checkedSelected() {
            return this.checkboxs
            .map((checkbox, index) => (checkbox.checked ? index : -1))
            .filter(index => index !== -1);
        }
    },
    methods : {
        changeColorBar () {
            const porcentaje = (this.valueRange - 4) / (20 - 4) * 100;
            this.colorBarBg = `linear-gradient(to right, #A4FFAF ${porcentaje}%, #18171F ${porcentaje}%)`;
        },
        getColor(index) {
            /* Se obtiene la cantidad de checkbox seleccionados */
            const selectedCount = this.checkedSelected.length;
            /* Se verificac cuantos check se selecionaron */
            if (index < selectedCount) {
                /* Se cambia el texto del span de los divs */
                this.textDiv = this.divText[selectedCount-1];
                /* Se regresa el color que se le aplicara a los divs seleccionaodos */
                return this.divColor[selectedCount-1];
            }
            
            return this.divColor[4];
        },
        upperCaseLetter() {
            const codigoAscii = Math.floor(Math.random () * (90 - 65 + 1)) + 65;
            return String.fromCharCode(codigoAscii);
        },
        lowerCaseLetter() {
            const codigoAscii = Math.floor(Math.random () *  (122 - 97 + 1)) + 97;
            return String.fromCharCode(codigoAscii);
        },
        getSymbol() {

            const rangeAscci = [
                { min: 33, max: 47 },  // ! " # $ % & ' ( ) * + , - . /
                { min: 58, max: 64 },  // : ; < = > ? @
                { min: 91, max: 96 },  // [ \ ] ^ _ `
                { min: 123, max: 126 } // { | } ~
            ];
            
            const rangeSelected = rangeAscci[Math.floor(Math.random() * rangeAscci.length)];

            const codigAscii = Math.floor(Math.random() * (rangeSelected.max - rangeSelected.min + 1)) + rangeSelected.min;

            return String.fromCharCode(codigAscii);
        },
        generatePassword(){
            const passwordArray = [];
            const numcheckBoxChosen = this.checkedSelected.length;
            let numIteration = 0;
            
            numcheckBoxChosen !== 0 ? numIteration = Math.ceil(this.valueRange / numcheckBoxChosen) : numIteration = 0;
        
            if(numIteration === 0) return false;
            for (let index = 0; index < numIteration; index++) {
                this.checkedSelected.forEach((checkIndex) => {    
                    const checkboxId = this.checkboxs[checkIndex].id;                
                    if (checkboxId === 'uppercaseLetter') {
                        passwordArray.push(this.upperCaseLetter());
                    }
                    if (checkboxId === 'lowercaseLetter') {
                        passwordArray.push(this.lowerCaseLetter());
                    }
                    if (checkboxId=== 'numbers') {
                        passwordArray.push(Math.floor(Math.random() * 9) + 1); 
                    }
                    if (checkboxId === 'symbols') {
                        passwordArray.push(this.getSymbol());
                    }
                })
            }
            let passw = passwordArray.slice(0, this.valueRange).join('');
            
            this.password = passw;
        },
        copyPassword(){
            const textCopy = this.password;
            navigator.clipboard.writeText(textCopy).then(function () {
                alert('Texto copiado!');
            }).catch(function () {
                alert('Error al copiar texto.');
            });
        }
    },
    created(){
        this.changeColorBar();
    }
}
</script>

<style lang="css">
:root {
    --almost_white: #E6E5EA;
    --neon_green: #A4FFAF;
    --dark_gray: #24232C;
    --very-dark_gray: #18171F;
    --yellow: #F8CD65;
    --gray: #817D92;
    --orange: #FB7C58;
    --red: #F64A4A;

    font-size: 62.5%;
}
body {
    background-color: #08070B;
    color: var(--gray);
    font-family: "JetBrains Mono", monospace;
    font-size: 1.6rem;
    font-weight: bold;
}
.container {
    margin: 6.35rem 1.6rem;
}
header .title {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 1.6rem;
}
.password__copy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--dark_gray);
    padding: 1.65rem 1.5rem;
    margin-bottom: 1.6rem;
}
.password__copy span {
    font-size: 2.4rem;
}
.password__copy img {
    width: 1.75rem;
    height: 2rem;
}
.password__copy img:hover {
    cursor: pointer;
    transition: linear 0.5s;
    transform: scale(1.05) translateX(.2rem);
    filter: saturate(1.5);
}
.password__opcion {
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    background-color: var(--dark_gray);
}
.character__length {
    display: grid;
    row-gap: .8rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 3rem;
}
.character__length span {
    font-size: 2.4rem;
    color: var(--neon_green);
    justify-self: flex-end;
}
/*-------------estilos para la barra del rango---------------- */
 .character__length input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: .8rem;
    background: var(--very-dark_gray);
    grid-column: 1 / -1;
}
.character__length input[type="range"]::-webkit-slider-runnable-track {
    height: .8rem;
}
/* -------estilos para el thumb(control deslizante)-------- */
.character__length input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2.8rem;
    height: 2.8rem;
    background: var(--gray);
    border-radius: 50%;
    margin-top: -1rem;
}
.character__length input[type="range"]::-webkit-slider-thumb:hover {
    cursor: pointer;
    border: 2px solid var(--neon_green);
    background-color: var(--very-dark_gray);
    transition: 0.5s;
}
.container__checkbox {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-bottom: 3rem;
}
.container__checkbox label {
    display: flex;
    gap: 1.5rem;
}
.container__checkbox input[type="checkbox"] {
    display: none;
}
.container__checkbox label .checkmark {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--gray);
    display: inline-block;
}
.container__checkbox label .checkmark:hover {
    cursor: pointer;
    border: 2px solid var(--neon_green);
    background-color: var(--very-dark_gray);
    transition: 0.5s;
}
.container__checkbox label input[type="checkbox"]:checked + .checkmark {
    border: none;
    background-color: var(--neon_green);
    background-image: url('../assets/images/icon-check.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70% 70%;
}
.password__result {
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.65rem 1.5rem;
    background-color: var(--very-dark_gray);
    margin-bottom: 1.5rem;
}
.container__bars { 
    display: flex;
    align-items: center;
    gap: 1rem;
}
.container__bars div {
    width: 1rem;
    height: 2.8rem;
    border: 2px solid var(--gray);
}
.generator {
    text-transform: uppercase;
    display: flex;
    font-family: "JetBrains Mono", monospace;
    font-size: 1.6rem;
    font-weight: 700;
    background-color: var(--neon_green);
    justify-content: center;
    align-items: center;
    height: 5.6rem;
    border: none;
}
.generator:hover {
    cursor: pointer;
    border: 2px solid var(--neon_green);
    background-color: var(--dark_gray);
    color: var(--neon_green);
    transition: 0.5s;
}
.generator .img__arrow {
    width: 20px;
    height: 20px;
    background-image: url(../assets/images/icon-arrow-right.svg);
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 1rem;
}
.generator:hover .img__arrow {
    transition: 0.5s;
    background-image: url(../assets/images/icon-arrow-right-neon.svg);
}
.error {
    font-size: 1.6rem !important;
    color: var(--red);
}
/* ------------------(>768)---------------------- */
@media screen and (min-width: 48rem){
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
    }
    header {
        width: 54rem;
    }
    header .title {
        font-size: 2.4rem;
    }
    .password__copy {
        width: 54rem;
    }
    .password__copy span {
        font-size: 3.2rem;
    }
    .password__copy img {
        width: 2.1rem;
        height: 2.4rem;
    }
    .password__opcion {
        width: 54rem;
    }
    .character__length span {
        font-size: 3.2rem;
    }
    .character__length label {
        font-size: 1.8rem;
    }
    .container__checkbox label {
        font-size: 1.8rem;
    }
    .password__result span {
        font-size: 1.8rem;
    }
    .generator {
        height: 6.5rem;
        font-size: 1.8rem;
    }
}
</style>