$(function () {

	tablaInicial();
	$("#b_verificar").click(function (e) {
		cuadro = [];
		//console.log("boton resolver");	

		if (errorFila() == true) {
			//console.log(fila);
			//$("#text_resp").html("se encontraron errores");
			mostrarMensaje();
			colorError(1, fila);
		} else {
			$("#text_resp").html("hasta ahora no se encontraron errores");
			colorError(0, 10);
		}

		if (errorColum() == true) {
			//$("#text_resp").html("se encontraron errores");
			//console.log("la columna de error es"+colum);	
			mostrarMensaje();		
			colorError(2, colum);
		} else {
			$("#text_resp").html("hasta ahora no se encontraron errores");
			colorError(0, 10);
		}

		if (errorSubcuadro() == true) {
			mostrarMensaje();
			//$("#text_resp").html("se encontraron errores");
			//console.log("la columna de error es"+colum);			
			colorError(3, cua);
		} else {
			$("#text_resp").html("hasta ahora no se encontraron errores");
			colorError(0, 10);
		}
	});

	const mostrarMensaje = indice =>{
		$("#text_resp").html("se encontraron errores");
	}

	$("#b_borrar").click(function (e) {
		//console.log("boton borrar");
		borrar();
	});

	$("#b_terminar").click(function (e) {
		//console.log("boton terminar");
		swal(
			{
				title: "Seguro que deseas terminar tu sudoku",
				text: `Se evaluaran tus resultados`,
				type: "info",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Si, lo deseo",
				cancelButtonText: "No, cancelar",
				closeOnConfirm: true,
				closeOnCancel: false
			}
			,
			function (isConfirm) {
				if (isConfirm) {
					resultadoFinal();
					if(resultadoFinal()==true){
						console.log("sudoku correcto");	
						//swal("Felicitaciones","Completo con exito el sudoku","success",confirmButtonText:"");
						swal({
							title: "Felicitaciones!",
							text: "Completo con exito el sudoku",
							timer: 2000,
							confirmButtonText: "OK",
							type: "success"
						});
					}else{
						console.log("el resultado no es correcto");
						swal({
							title: "Oh no!",
							text: "Intenta de nuevo",
							timer: 2000,
							confirmButtonText: "OK",
							type: "error"
						});
					}
							
				} else {
					//console.log("se cancela la accion borrar");
					swal("Cancelar","Se ha cancelado la acción","error");
				}
			}
		)

	});

	const borrar = indice => {
		//console.log("aqui deberia borrar");
		swal(
			{
				title: "¿Deseas borrar todo?",
				text: `Se iniciara el sudoku desde 0`,
				type: "info",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Si, lo deseo",
				cancelButtonText: "No, cancelar",
				closeOnConfirm: true,
				closeOnCancel: false
			}
			,
			function (isConfirm) {
				if (isConfirm) {
					//console.log("inicia de nuevo el sudoku");	
					borrarTodo();
					swal({
						title: "Proceso realizado",
						text: "Se ha eliminado la tarea",
						type: "success"
					});
				} else {
					//console.log("se cancela la accion borrar");
					swal({
						title: "Cancelar",
						text: "Se ha cancelado la acción",
						timer: 2000,
						type: "error"
					});
				}
			}
		)
	}

	function resultadoFinal() {
		correcto = false;
		contador = 0;
		completo = false;
		tablaFin = traerTabla();
		//console.log(tablaFin);
		
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if(tablaFin[i][j]==0){
					contador++;
				}				
			}			
		}
		if(contador == 0){
			completo=true;
		}else{
			completo=false;
		}
		console.log("el sudoku completo? "+completo);

		if(completo==true){
			if (errorFila() == false && errorColum() == false && errorSubcuadro() == false) {
				correcto = true;
			}else{
				correcto=false;
			}
		}else{
			correcto=false;
		}

		return correcto;
		console.log("el sudoku es correcto? "+correcto);
	}

	function tablaInicial() {
		//console.log("funcion tarer tabla");
		tablaIni = new Array(9);

		for (i = 0; i < 9; i++) {
			tablaIni[i] = new Array(9);
		}

		//llenar cada array con los datos actuales
		for (j = 0; j < 9; j++) {
			for (i = 0; i < 9; i++) { //primera fila
				a = $("#i" + (i + (9 * j))).val();
				celda = parseInt(a);

				if (a.length == 0) {
					//console.log("el elemento i" + i + " no es un numero");
					celda = 0;
				}
				tablaIni[j][i] = celda;
			}
		}
		return tablaIni;
	}

	function traerTabla() {
		//console.log("funcion tarer tabla");
		tabla = new Array(9);

		for (i = 0; i < 9; i++) {
			tabla[i] = new Array(9);
		}

		//llenar cada array con los datos actuales
		for (i = 0; i < 9; i++) { //primera fila
			a = $("#i" + i).val();
			celda = parseInt(a);

			if (a.length == 0) {
				//console.log("el elemento i" + i + " no es un numero");
				celda = 0;
			}
			tabla[0][i] = celda;
		}
		for (i = 0; i < 9; i++) { //segunda fila
			a = $("#i" + (i + 9)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[1][i] = celda;
		}
		for (i = 0; i < 9; i++) { //3 fila
			a = $("#i" + (i + 18)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[2][i] = celda;
		}
		for (i = 0; i < 9; i++) { //4 fila
			a = $("#i" + (i + 27)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[3][i] = celda;
		}
		for (i = 0; i < 9; i++) { //5 fila
			a = $("#i" + (i + 36)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[4][i] = celda;
		}
		for (i = 0; i < 9; i++) { //6 fila
			a = $("#i" + (i + 45)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[5][i] = celda;
		}
		for (i = 0; i < 9; i++) { //7 fila
			a = $("#i" + (i + 54)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[6][i] = celda;
		}
		for (i = 0; i < 9; i++) { //8 fila
			a = $("#i" + (i + 63)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[7][i] = celda;
		}
		for (i = 0; i < 9; i++) { //9 fila
			a = $("#i" + (i + 72)).val();
			celda = parseInt(a);

			if (a.length == 0) {
				celda = 0;
			}
			tabla[8][i] = celda;
		}
		return tabla;
	}

	function borrarTodo() {
		nuevo = [];
		//console.log(tablaIni);

		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				nuevo.push(tablaIni[i][j]);
			}
		}
		for (i = 0; i < 81; i++) {
			if (nuevo[i] == 0) {
				nuevo[i] = " ";
			}
			$('#i' + i).val(nuevo[i]);
		}

		colorError(0, 10);

	}

	function errorFila() {
		$tabla = traerTabla();

		let $fila;
		hayError = false;

		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				if ($tabla[i][j] != 0) { //num diferentes a cero
					for (let a = 1; a < 8; a++) {
						if ($tabla[i][j] == $tabla[i][(j + a)]) {
							hayError = true;
							//console.log("error en la fila" + (i+1) );
							$fila = i;
							//$("#text_resp").html("el numero "+$tabla[i][(j+a)]+" se repite en fila");	
							//$('#i'+((j+a)+(9*i))).css("background","red");					 
						}
					}
				}
			}
		}
		fila = $fila;
		//console.log("la fila de error es "+fila);		
		return hayError;
	}

	function errorColum() {
		$tabla = traerTabla();
		newtable = new Array(9);

		for (let i = 0; i < 9; i++) {
			newtable[i] = new Array(9);
		}

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				newtable[i][j] = $tabla[j][i];
			}
		}

		$tabla = traerTabla();

		let $colum;
		hayError = false;

		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				if (newtable[i][j] != 0) { //num diferentes a cero
					for (let a = 1; a < 8; a++) {
						if (newtable[i][j] == newtable[i][(j + a)]) {
							hayError = true;
							//console.log("error en la fila" + (i+1) );
							$colum = i;
							//$("#text_resp").html("el numero "+$tabla[i][(j+a)]+" se repite en fila");	
							//$('#i'+((j+a)+(9*i))).css("background","red");					 
						}
					}
				}
			}
		}
		colum = $colum;
		//console.log("la columna de error es " + (colum + 1));
		return hayError;

	}

	function errorSubcuadro() {
		$tabla = traerTabla();
		//console.log($tabla);

		subcuadro1 = [];
		subcuadro2 = [];
		subcuadro3 = [];
		subcuadro4 = [];
		subcuadro5 = [];
		subcuadro6 = [];
		subcuadro7 = [];
		subcuadro8 = [];
		subcuadro9 = [];


		//cuadro 1 
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				aux = $tabla[i][j];
				subcuadro1.push(aux);

			}
		}
		cuadro.push(subcuadro1);
		//cuadro 2 
		for (i = 0; i < 3; i++) {
			for (j = 3; j < 6; j++) {
				aux = $tabla[i][j];
				subcuadro2.push(aux);

			}
		}
		cuadro.push(subcuadro2);
		//cuadro 3 
		for (i = 0; i < 3; i++) {
			for (j = 6; j < 9; j++) {
				aux = $tabla[i][j];
				subcuadro3.push(aux);
			}
		}
		cuadro.push(subcuadro3);
		//cuadro 4 
		for (i = 3; i < 6; i++) {
			for (j = 0; j < 3; j++) {
				aux = $tabla[i][j];
				subcuadro4.push(aux);
			}
		}
		cuadro.push(subcuadro4);
		//cuadro 5 
		for (i = 3; i < 6; i++) {
			for (j = 3; j < 6; j++) {
				aux = $tabla[i][j];
				subcuadro5.push(aux);
			}
		}
		cuadro.push(subcuadro5);
		//cuadro 6
		for (i = 3; i < 6; i++) {
			for (j = 6; j < 9; j++) {
				aux = $tabla[i][j];
				subcuadro6.push(aux);
			}
		}
		cuadro.push(subcuadro6);
		//cuadro 7
		for (i = 6; i < 9; i++) {
			for (j = 0; j < 3; j++) {
				aux = $tabla[i][j];
				subcuadro7.push(aux);
			}
		}
		cuadro.push(subcuadro7);
		//cuadro 8
		for (i = 6; i < 9; i++) {
			for (j = 3; j < 6; j++) {
				aux = $tabla[i][j];
				subcuadro8.push(aux);
			}
		}
		cuadro.push(subcuadro8);
		//cuadro 9
		for (i = 6; i < 9; i++) {
			for (j = 6; j < 9; j++) {
				aux = $tabla[i][j];
				subcuadro9.push(aux);
			}
		}
		cuadro.push(subcuadro9);

		let $cuadro;
		hayError = false;

		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				if (cuadro[i][j] != 0) { //num diferentes a cero
					for (let a = 1; a < 8; a++) {
						if (cuadro[i][j] == cuadro[i][(j + a)]) {
							hayError = true;
							//console.log("error en la fila" + (i+1) );
							$cuadro = i;
							//$("#text_resp").html("el numero "+$tabla[i][(j+a)]+" se repite en fila");	
							//$('#i'+((j+a)+(9*i))).css("background","red");					 
						}
					}
				}
			}
		}
		cua = $cuadro;
		//console.log("el cuadro de error es " + (cua + 1));
		return hayError;
	}

	function colorError(tipo, celda) {
		//console.log("esta en color error");		
		if (tipo == 1) { //error en fila
			//console.log("esta en color error op 1");
			for (let j = 0; j < 9; j++) {
				if (celda == j) {
					//console.log("esta en color error op1 fila 1");	

					for (i = 0; i < 9; i++) {
						$('#i' + (i + (9 * j))).css("background", "lightcoral");
					}

				}
			}
		}

		if (tipo == 2) { //error en colum
			for (i = 0; i < 9; i++) {
				if (celda == i) {
					$('#i' + (i)).css("background", "lightcoral");
					$('#i' + (i + 9)).css("background", "lightcoral");
					$('#i' + (i + 18)).css("background", "lightcoral");
					$('#i' + (i + 27)).css("background", "lightcoral");
					$('#i' + (i + 36)).css("background", "lightcoral");
					$('#i' + (i + 45)).css("background", "lightcoral");
					$('#i' + (i + 54)).css("background", "lightcoral");
					$('#i' + (i + 63)).css("background", "lightcoral");
					$('#i' + (i + 72)).css("background", "lightcoral");
				}

			}

		}

		if (tipo == 3) {//error en cuadro
			for (c = 0; c < 3; c++) { //primeros
				if (celda == c) {
					for (i = 0; i < 3; i++) {//vertical
						for (j = 0; j < 3; j++) { //horizontal
							$('#i' + ((j + (3 * c)) + (9 * i))).css("background", "lightcoral");
						}
					}
				}
			}
			for (c = 3; c < 6; c++) {
				if (celda == c) {
					for (i = 3; i < 6; i++) {//vertical
						for (j = 0; j < 3; j++) { //horizontal
							$('#i' + ((j + (3 * (c - 3))) + (9 * i))).css("background", "lightcoral");
						}
					}
				}
			}
			for (c = 6; c < 9; c++) {
				if (celda == c) {
					for (i = 6; i < 9; i++) {//vertical
						for (j = 0; j < 3; j++) { //horizontal
							$('#i' + ((j + (3 * (c - 6))) + (9 * i))).css("background", "lightcoral");
						}
					}
				}
			}
		}

		if (tipo == 0) { //sin errores
			for (j = 0; j < 9; j++) {
				for (i = 0; i < 9; i++) {
					//console.log("deberia volver el color blanco");				
					$('#i' + (i + (9 * j))).css("background", "white");
				}
			}

		}

	}
});


function fontsize(object, value) {

	//console.log("esta en funcion fontsize");
	if (object.value.length > 0) { //el campo tiene un caracter
		if (object.value == " ") { //el usuario no escribio nada
			object.value = "";
		}
	}

}

