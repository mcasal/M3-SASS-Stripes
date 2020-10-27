// Si es posa l'atribut novalidate, no salten les validacions en html

/******* SEARCH VALIDATOR *******/

// Al nostre cas, tenim dos formularis (un per a pantalles petites i l'altre per a pantalles grans). Primer s'ha de seleccionar quin volem validar per a després validar-lo.
let searchForm;
let errorSearch;

// Mirem el breakpoint per escollir un dels dos formularis
if (window.innerWidth <= 991) {
	searchForm = document.getElementById('searchFormInputXS');
	errorSearch = document.getElementById('errorSearchXS');
} else {
	searchForm = document.getElementById('searchFormInputLG');
	errorSearch = document.getElementById('errorSearchLG');
}

let parentElement = searchForm.parentElement; // selecciona l'element pare del input (el div en aquest cas, per a canviar el color del borde)

function searchValidator() {
	let errors = 0; // es farà servir per retornar true o false a la funció

	// Comprovem si el camp està buit
	if (searchForm.value == ""){
		searchForm.classList.add('is-invalid');
		searchForm.style.paddingRight = "0"; // trec el padding-right que porta is-invalid pq es desmunta tot el header
		errorSearch.textContent = "Escriu alguna cosa!";
		parentElement.classList.remove('border');
		parentElement.classList.add('border-error');
		errors++;
	} else if (searchForm.value.length < 3) {
		searchForm.classList.add("is-invalid");
		searchForm.style.paddingRight = "0";
		errorSearch.textContent = "Utilitza almenys 3 caràcters!";
		parentElement.classList.remove('border');
		parentElement.classList.add('border-error');
		errors++;
	}

	if(errors > 0) {
		return false;
	} else {
		return true;
	} // (errors > 0) ? false : true; seria lo mateix
}

if (searchForm){
	searchForm.addEventListener('blur', function(event) {
		if(event.target.value!='') {
			event.target.classList.remove('is-invalid'); 
			parentElement.classList.remove('border-error');
			parentElement.classList.add('border');
		}
		return true;
	});
}

/******* FORM VALIDATOR per a login *******/

/* Primer declarar una variable amb el id del form a validar */
const login = document.getElementById('formLogin');

function loginValidator() {
	login.classList.remove('is-invalid'); // primer elimina la class per a q no surti tot en vermell
	let inputLoginUsuari = document.getElementById('loginUsuari');
	let inputLoginPass = document.getElementById('loginPass');
	let errors = 0;

	// El camp de l'usuari és un email
	if (!validar_email(inputLoginUsuari.value)){
		inputLoginUsuari.classList.add("is-invalid");
		document.getElementById("errorUsuari").textContent = "El format de l'email no és correcte";
		errors++;
	} else {
		inputLoginUsuari.classList.add("is-valid");
	}

	// Amb l'atribut required a l'input no sé fins quin punt seria necessari validar això o a l'inversa
	if (inputLoginPass.value == "") {
		inputLoginPass.classList.add("is-invalid");
		document.getElementById("errorLoginPass").textContent = "La contrasenya és obligatòria";
        errors++;
    } else {
		inputLoginPass.classList.add("is-valid");
	}
	
	if(errors > 0) {
		return false;
	} else {
		return true;
	}
}

// Borra tots els camps en vermell (is-invalid) per a quan es torni a omplir cada input on focus
if (login) {
	login.addEventListener('blur', (event) => {
		console.log(event);
		if(event.target.value!='') event.target.classList.remove('is-invalid');
	}, true);
}


/******* FORM VALIDATOR per a register *******/

//Primer declarar una variable amb el id del form a validar
const register = document.getElementById('formRegister');

function registerValidator() {
	let errors = 0;
	
	register.classList.remove('is-invalid'); // primer elimina la class per a q no surti tot en vermell

	// Es declaren les variables per recollir els valors dels inputs
	let inputRegisterNom = document.forms["formRegister"]["nom"]; // document.getElementById('nom'); etc
	let inputRegisterCognom = document.forms["formRegister"]["cognom"];
	let inputRegisterProvincia = document.forms["formRegister"]["provincia"];
	let inputRegisterEmail = document.forms["formRegister"]["email"];
	let inputRegisterPass = document.forms["formRegister"]["contrasenya"];
	let inputRegisterPass2 = document.forms["formRegister"]["contrasenya2"];
	let inputTerms = document.forms["formRegister"]["acceptTerms"];

	// INPUT NOM Primer es valida el input del nom per saber si està buit (això amb el required com atribut al html també ho fa), després valida que només hi hagin lletres.
	if (inputRegisterNom.value == "") {
		inputRegisterNom.classList.add("is-invalid");
		document.getElementById("errorNom").textContent = "El camp és obligatori";
        errors ++;
    } else if (!validar_text(inputRegisterNom.value)){
		document.getElementById("errorNom").textContent = "Només les lletres son vàlides";
        errors ++;
	} else {
		inputRegisterNom.classList.add("is-valid");
	}

	// INPUT COGNOM
	if (inputRegisterCognom.value == "") {
		inputRegisterCognom.classList.add("is-invalid");
		document.getElementById("errorCognom").textContent = "El camp és obligatori";
        errors ++;
    } else if (!validar_text(inputRegisterCognom.value)){
		document.getElementById("errorCognom").textContent = "Només les lletres son vàlides";
        errors ++;
	} else {
		inputRegisterCognom.classList.add("is-valid");
	}

	// INPUT PROVINCIA
	if (inputRegisterProvincia.value == "") {
		inputRegisterProvincia.classList.add("is-invalid");
		document.getElementById("errorProvincia").textContent = "La província és obligatoria";
		errors ++;
	}

	// INPUT EMAIL
	if (!validar_email(inputRegisterEmail.value)){
		inputRegisterEmail.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "El format de l'email no és correcte";
		errors++;
	} else {
		inputRegisterEmail.classList.add("is-valid");
	}

	// INPUT CONTRASENYA controlant el length i la fortalesa de la contrasenya amb regex
	if (inputRegisterPass.value == "") {
		inputRegisterPass.classList.add("is-invalid");
		document.getElementById("errorPass").textContent = "Escriu una contrasenya";
		errors ++;
	} else if (inputRegisterPass.value.length < 6) {
		inputRegisterPass.classList.add("is-invalid");
		document.getElementById("errorPass").textContent = "La contrasenya ha de contenir almenys 6 caràcters";
		errors ++;
	} else if (!validar_pass(inputRegisterPass.value)) {
		inputRegisterPass.classList.add("is-invalid");
		document.getElementById("errorPass").textContent = "La contrasenya ha de contenir almenys una majúscula, una minúscula, un número i un caràcter especial";
		errors ++;
	} else {
		inputRegisterPass.classList.add("is-valid");
	}

	// INPUT SEGONA CONTRASENYA
	if (inputRegisterPass2.value == "" || inputRegisterPass.value == "") {
		inputRegisterPass2.classList.add("is-invalid");
		document.getElementById("errorPass2").textContent = "Escriu una contrasenya";
		errors ++;
	} else if (inputRegisterPass2.value.length < 6) {
		errors ++;
	} else if (inputRegisterPass.value != inputRegisterPass2.value) {
		inputRegisterPass2.classList.add("is-invalid");
		document.getElementById("errorPass2").textContent = "La contrasenya no coincideix";
		errors ++;
	} else {
		inputRegisterPass2.classList.add("is-valid");
	}

	// A les condicions d'ús hi ha un required al input checkbox. Amb el novalidate no funciona
	// INPUT CHECKBOX
	if (!inputTerms.checked) {
		inputTerms.classList.add("is-invalid");
		document.getElementById("errorCheck").textContent = "Marca la casella per acceptar les condicions d'ús";
		errors ++;
	}

	if (errors > 0) {
		return false;
	} else {
		return true;
	}
}

if (register) {
	register.addEventListener('blur', (event) => {
		console.log(event);
		if(event.target.value!='') event.target.classList.remove('is-invalid');
	}, true);
}


function validar_email(email) {
	const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
	return regex.test(email) ? true : false; // si es compleix, és true. Si no, és false.
}

function validar_text(text) {
	const regexLetters = /^[a-zA-Z]*$/; // Només lletres, ja siguin majúscules o minúscules
	return regexLetters.test(text) ? true : false;
}

function validar_pass(pass) {
	const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // És necessari almenys un símbol, una majúscula, una minúscula, un número i un mínim de 6 caràcters.
	return regexPassword.test(pass) ? true : false;
}