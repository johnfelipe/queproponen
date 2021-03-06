function MostrarContenedor(tipo)
{
	var template = null;
	switch(tipo)
	{
		case contenedores.PARTIDOS:
			template = 
			"<a class='twitterButton' onclick='javascript:CompartirInicio(0)'>Compartí en Twitter</a>"
			+"<a class='facebookButton' onclick='javascript:CompartirInicio(1)'>Compartí en Facebook</a>"
			+"<div class='partidosContainer'><div class='title'>Partidos Políticos y Frentes</div></div> ";
			break;
		case contenedores.CANDIDATOS:
			template = "<div class='candidatosContainer'>"+
            	"<div class='title'>Candidatos a Gobernador</div>"+
				"</div>";
			break;
		case contenedores.PROPUESTAS:
			template = "<div class='propuestasContainer'>"+
						"<div class='title' onclick='javascript:ToggleCategoriaBarra(this)'>Propuestas</div>"+
						"<div class='graficoContainer'></div>";
			categorias.forEach(function(cat)
			{
				template += "<div class='tipo'>"+
								"<div class='title' onclick='javascript:ToggleCategoriaBarra(this)' >"+
									"<img src='IMG/categorias/"+cat.imagen+"' height='50' width='50' />"+
									"<span style='color:"+cat.color+";'>"+cat.nombre+"</span>"+
									"<div class='arrowButton down'></div>"+
									"<span class='quantityList'>0</span>"+
								"</div>"+
								"<div id='cat"+cat.codigo+"' class='contPropuestas'></div>"+
							"</div>";
			});
			template += "</div> ";
			break;
	};
	return template;
}

function CompartirInicio(tipo)
{
	if(tipo == 0)
	  window.open('https://twitter.com/intent/tweet?'+
	  'related=PartidodelaRed&'+
	  'text='+ '%23yvosquepropones las propuestas de todos los candidatos para '+ Ciudad +' en un solo lugar '+location.origin+location.pathname, 'tweet', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
	else
	  window.open('http://www.facebook.com/dialog/feed?app_id=825676227513877' +
        '&link='+location.origin+location.pathname +
        '&picture=http:%2F%2Fqueproponen.com.ar%2Fvosquepropones%2FIMG%2FshareLogo.png' +
        '&name=' + 'Todas las propuestas de los candidatos para '+Ciudad+' en un solo lugar' +
        '&caption=' + 'via queproponen.com.ar - Partido de la Red' +
        '&description=' + 'Conocé todas las propuestas de los candidatos a Gobernador de '+ Ciudad +' y discutilas directamente con los ellos.' +
        '&redirect_uri='+location.origin+location.pathname+'close.html' +
        '&display=popup'
		, 'Compartí todas las propuestas', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
}

function HeaderPartido(part)
{
	var container = document.createElement('div');
	$(container).attr('id', part.nombre);
	$(container).addClass('partidoContainer');
	$(container).css('display', 'block').css('width', '100%');
	
	var imagen = document.createElement('div');
	$(imagen).addClass('imagenPartido_Header');
	$(imagen).css('background-image', 'url(IMG/partidos/' + part.imagen + ')');
	$(container).append(imagen);
	
	var nombre = document.createElement('div');
	$(nombre).addClass('item').addClass('nombre_Header');
	$(nombre).css('color', part.color).css('background-color', '#fff');
	$(nombre).html(part.nombre);
	$(container).append(nombre);
	
	var tweet = document.createElement('a');
	$(tweet).addClass('twitterButton');
	$(tweet).html('Compartí sus propuestas en twitter');
	$(tweet).click(function(e) {
		window.open('https://twitter.com/intent/tweet?'+
		'url='+location.origin+location.pathname+'%23partido%2F'+part.nombre.split(' ').join('-')+'&'+
		'related=PartidodelaRed&'+
		'text='+ '%23yvosquepropones Mirá las propuestas para ' + Ciudad + ' del ' + part.nombre, 'tweet', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
	});
	$(nombre).append(tweet);

	var facebook = document.createElement('a');
	$(facebook).addClass('facebookButton');
	$(facebook).html('Compartí sus propuestas en facebook');
	$(facebook).click(function(e) {
		window.open(
		'http://www.facebook.com/dialog/feed?app_id=825676227513877' +
        '&link=' + escape(window.location.href) +
        '&picture=http:%2F%2Fqueproponen.com.ar%2Fvosquepropones%2FIMG%2FshareLogo.png' +
        '&name=' + 'Todas las propuestas del ' + part.nombre +
        '&caption=' + 'via queproponen.com.ar - Partido de la Red' +
        '&description=' + 'Conocé todas sus propuestas y la de todos los candidatos a Jefe e Gobierno en'+ Ciudad +
        '&redirect_uri=' + 'http://queproponen.com.ar/close.html' +
        '&display=popup'
		, 'Compartí todas las propuestas del partido', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
	});
	$(nombre).append(facebook);

	var candidatosDIV = document.createElement('div');
	$(candidatosDIV).addClass('item').addClass('candidatos_Header');
	$(candidatosDIV).html(part.candidatos.length);
	$(container).append(candidatosDIV);

	
	var propuestasDIV = document.createElement('div');
	$(propuestasDIV).addClass('item').addClass('propuestas_Header');
	$(propuestasDIV).html(part.propuestas.length);
	if(part.propuestas.length == 0)
	    $(propuestasDIV).addClass('numeroNoPropuestas');
	$(container).append(propuestasDIV);
	
	return container;
}

function HeaderCandidato(cand, part)
{
	var container = document.createElement('div');
	$(container).attr('id', cand.nombre);
	$(container).addClass('candidatoContainer_Header');
	
	var imagen = document.createElement('div');
	$(imagen).addClass('imagenCandidato');
	$(imagen).css('background-image', 'url(IMG/candidatos/' + cand.imagen + ')');
	$(container).append(imagen);
	
	var cont = document.createElement('div');
	$(cont).css('display', 'inline-block');
	$(cont).css('vertical-align', 'top');
	$(cont).css('margin', '6px 0');
	
	var nombre = document.createElement('div');
	$(nombre).addClass('nombreCandidato');
	$(nombre).html(cand.nombre);
	$(cont).append(nombre);
	
	var color = document.createElement('div');
	$(color).addClass('colorCandidato');
	$(color).css('background-color', part.color);
	$(color).html(part.nombre);
	$(cont).append(color);
	
	var lista = document.createElement('div');
	$(lista).addClass('listaCandidato');
	$(lista).html(cand.lista);
	$(cont).append(lista);
	
	$(container).append(cont);

	var tweet = document.createElement('a');
	$(tweet).addClass('twitterButton');
	$(tweet).html('Compartilo en twitter');
	$(tweet).click(function(e) {
		window.open('https://twitter.com/intent/tweet?'+
		'url='+location.origin+location.pathname+'%23candidato%2F'+cand.nombre.split(' ').join('-')+'&'+
		'related=PartidodelaRed&'+
		'text='+ '%23yvosquepropones Mirá las propuestas para ' + Ciudad + ' de ' + cand.nombre, 'tweet', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
	});
	$(container).append(tweet);
	
	var facebook = document.createElement('a');
	$(facebook).addClass('facebookButton');
	$(facebook).html('Compartilo en facebook');
	$(facebook).click(function(e) {
		window.open(
		'http://www.facebook.com/dialog/feed?app_id=825676227513877' +
        '&link=' + escape(window.location.href) +
        '&picture=http:%2F%2Fqueproponen.com.ar%2Fvosquepropones%2FIMG%2FshareLogo.png' +
        '&name=' + 'Todas las propuestas de ' + cand.nombre +
        '&caption=' + 'via queproponen.com.ar - Partido de la Red' +
        '&description=' + 'Conocé todas sus propuestas y la de todos los candidatos a Gobernador en '+ Ciudad +
        '&redirect_uri=' + 'http://queproponen.com.ar/close.html' +
        '&display=popup'
		, 'Compartí todas las propuestas del candidato', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
	});
	$(container).append(facebook);

	var propuestasDIV = document.createElement('div');
	$(propuestasDIV).addClass('item').addClass('propuestas_Header');
	$(propuestasDIV).html(cand.propuestas.length);
	if(cand.propuestas.length == 0)
	    $(propuestasDIV).addClass('numeroNoPropuestas');
	$(container).append(propuestasDIV);
	
	return container;
}

function MostrarVolver(tipo, cosa)
{
	var cont = document.createElement('div');
	$(cont).addClass('atrasContainer');
	$(cont).append(flecha);
	
	var flecha = document.createElement('div');
	$(flecha).addClass('flechaAtras');
	$(cont).append(flecha);
	
	var texto = document.createElement('div');
	$(texto).addClass('textoAtras');
	if (cosa == null)
		$(texto).html('Volver al Inicio');
	else if (cosa.nombre !== undefined)
		$(texto).html('Volver a ' + cosa.nombre);
		
	$(cont).click(function(e) {
		if(cosa == null)
			CargaInicial();
		else if(cosa.color != undefined)
			MostrarPartido(1, cosa);
		else if (cosa.twitter != undefined)
			MostrarCandidato(1, cosa);
    });	
		
	$(cont).append(texto);
	
	return cont;
}

function CargarAbout()
{
	$('.menu').children('.selected').removeClass('selected');
	$('.menu').children().last().addClass('selected');

	cont.stop(true, true).fadeOut('300ms', function() {
		$('.contentContainer').html('');

		var about = document.createElement('div');
		$(about).addClass('aboutContainer');
		$(about).html("La metodología de recopilación de la información se realizó investigando los medios sociales de los candidatos, frentes y partidos. <br/><br/> Se considera una propuesta a aquellas consignas cuyo destinatario sea una política pública a realizar en caso de que el candidato sea electo, NO a bases de acción política o manifiestos políticos. <br/><br/> La carga de los datos se hace en orden aleatorio.");
		$('.contentContainer').append(about);

    }).fadeIn('300ms').animate({marginTop:'0px'},'300ms');
}