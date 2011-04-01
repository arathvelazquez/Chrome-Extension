//Variables generales.
var popup;
var ul;
var li;

//Esta funci�n crea la div principal y la agregamos a la p�gina.
function creaContent() {				 
  popup = document.createElement("div"); //Creamos el elemento div.
  popup.id = "content";					 //Le damos nombre al id <div id="content">.
  popup.style.cssText = "width: 100%;";  //Que abarque todo el ancho de la p�gina.
  document.body.appendChild(popup);	     //Lo agregamos al body -DOM-.
}

//Con esta funci�n vamos a crear una lista y la agregamos a nuestro div anterior.
function creaUls() {					 	
  if (ul) popup.removeChild(ul);		 //Si ya existe ul, lo removemos.
  ul = document.createElement("ul");     //Creamos el elemento ul.
  popup.appendChild(ul);				 //Lo agregamos a div llamado popup.
}

//Truncamos el titulo de la p�gina para obtener solo 30 caracteres.
function truncate(cad) 
{
	var length = 30;
	var cad2Truncate = cad;
	var truncatedCad = cad2Truncate.substring(0,length);
	return truncatedCad;
}

//Creamos los elementos de la lista con el nombre y el favicon.
function creaElementos(numTabs, tabName)
{
	var i;								 //Contador para las tabs.	
	var favicon;						 //Para almacenar el favicon.
	var title;							 //Para almacenar el titulo.
	
	creaUls();							 //Creamos el elemento de lista desordenada.
	
	for (i=0;i<=numTabs;i++)			 						//Recorremos todas las tabs de la ventana.
	{
		li = document.createElement("li");						//Creamos los items para la lista.
		li.id = tabName[i].id;									//Le asignamos como id, el mismo id de la tab.
		
		if (tabName[i].selected) 								//Si la tab es la seleccionada, le damos otro estilo.
		{
			li.className = "selected";
		}
		
		favicon = document.createElement("img");				//Creamos un elemento de imagen.
		favicon.style.cssText = "width:16px; height:16px;";		//Le damos las dimensiones con CSS.
		favicon.src = tabName[i].favIconUrl || "vacio.png";		//El src ser� el favicon o en su caso una imagen en blanco.
		
		title = document.createElement("span");					//Creamos un span para darle formato al titulo
		title.className = "titulo";								//La clase para el CSS
		title.textContent = truncate(tabName[i].title);			//Agregamos el titulo de 30 caracteres a nuestro elemento span.
				
		//Aqu� vamos a agregar los elementos creados dinamicamente a nuestra p�gina usando -DOM-
		//En la "impresi�n" de HTML, lo que veremos ser� algo as�:
		//<li style="width:16px; heigth: 16px;" src="la_ruta_del_favicon">
		//<span class="titulo">El_titulo_del_tab(Truncado a 30 caracteres)</span></li>
		li.appendChild(favicon);								//Agregamos el favicon a nuestro item de la lista.								
		li.appendChild(title);									//Agregamos el titulo a nuestro item de la lista.
		ul.appendChild(li);										//Ahora, agregamos el item y su formato a la lista completa.
	}
}

//Esta parte es la mas importante.
//Creamos un evento para que al momento de cargar la p�gina se ejecuten nuestras funciones.
//Si no tuvieras este Event Listener, tendrias que mandar llamar la funci�n directamente desde tu HTML.
window.addEventListener("load", function() { 					//Se ejecuta al momento de cargar la p�gina ('load').
  //En esta parte, es necesario aclarar que al parametro llamado "tabs", le daremos toda la informacion de las pesta�as.
  //Observa que la parte de function(tabs) es el callback del m�todo y en este se realizan las operaciones.
  chrome.tabs.getAllInWindow(null, function(tabs) {				//Obtenemos informaci�n de todas las tabs abiertas...
		var num_tabs = tabs.length;								//Aqu� obtenemos el numero de tabs.
		num_tabs = num_tabs.toString();							//Convertimos el numero a string.
		
		//Este m�todo, nos permite modificar algunas partes del icono de la extensi�n.
		chrome.browserAction.setBadgeText({text: num_tabs});	//Imprimimos en el icono, el numero de tabs abiertas.
		
		//Ya con toda la informaci�n necesaria, solo nos queda crear los elementos principales.
		creaContent();											//Creamos din�micamente el div llamado content.
		creaElementos(num_tabs,tabs);							//Creamos los elementos como ul, li y los valores finales.
  });
}, false);






