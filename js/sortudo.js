
var sorteados = new Array(6);
var blackList = [0];
var luckList = new Array();
var index = 0;

function sortear(){
	disabledButton(true);


    //zerando o index dos sorteados.
	index = 0;
	sorteados = new Array(6);
	$("#divSorteio").html("");

	mostraNumerosDaSorte();
	
	for (var i = 1; i < 7 - luckList.length; i++){
			
		setTimeout("newSorteio()", 500 * i);
	}
	
}

function disabledButton(b){
	if (b){
		$("#botaoSortear").button("disable");
	}else{
		$("#botaoSortear").button("enable");
	}
}

function newSorteio(){

	

	var sorteado = Math.floor(Math.random() * 61 );
	
	if (jaExisteNumero(sorteado) || estaNaBlackList(sorteado)){
		debug(sorteado);
		newSorteio();
		return;
	}
	sorteados[index] = sorteado;
	mostraNumero(sorteado);
	index ++;

	//verificando se foi o ultimo numero sorteado;
	if (index == 6){
		disabledButton(false);
	}
}

function mostraNumerosDaSorte(){

	for (var i = 0; i < luckList.length; i++){
		sorteados[index] = luckList[i];
		mostraNumero(luckList[i]);
		index++;
	}
	
}


function jaExisteNumero(numero){
	for (var i = 0; i < sorteados.length; i++){
		if (sorteados[i] == numero){
			return true;
		}
	}
	return false;
}

function estaNaBlackList(numero){
	
	return blackList.indexOf(numero) > -1;
}

function mostraNumero(numero){
	$("#divSorteio").append(numero + " ");
}


function montaTabela10x6(){
	var count = 1;
	var html = "<li class=\"list-group-item txt-item\">";
	var htmlButton = "";
	while (count <= 60){
		var value = adicionarZeroEsquerda(count);
		htmlButton = "";
		htmlButton +=	"<button type=\"button\" class=\"btn btn-default\" onclick=\"putBlackList(this, " + value + ");\">";
  		htmlButton +=  value;
		htmlButton += "</button>";

		if (count % 10 == 0){

			html += htmlButton;
			html += "</li>"
			html += "<li class=\"list-group-item txt-item\">";	

		}else{

			html += htmlButton;
			
		}
		
		count++;
	}
	$("#table10x6").append(html);
		
}


function adicionarZeroEsquerda(value){
	if (value < 10){
		return "0" + value;
	}
	return value;
}

/*DEBUG REMOVER ISSO*/
function debug(d){
	$("#divDebug").append(d + "<br/>");
}
function ativaDebug(b){
	if (b){
		$("#divDebug").show();
	}else{
		$("#divDebug").hide();
	}
}

function putBlackList(button, value){
	if ($(button).hasClass("btn-danger")){
		$(button).removeClass("btn-danger");	
		$(button).addClass("btn-success");
		blackList.splice(blackList.indexOf(value),1);
		luckList.push(value);
		return;
	} 

	if ($(button).hasClass("btn-success")){
		$(button).removeClass("btn-success");
		luckList.splice(luckList.indexOf(value),1);	
		return;
	}

	$(button).addClass("btn-danger");
	blackList.push(value);


}