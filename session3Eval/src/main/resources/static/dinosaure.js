$(document).ready(function() {

	// appelle la méthode pour charger la base données dans la datatable
	loadDatatable();
	
	// déclaration d'une variable table;
	var table = $('#dinosTable').DataTable();
	
	/* Si vous double-cliquez sur une ligne de la datatable
	   vous récupérez la valeur des attributs de la ligne concernée (row)
	   aux différentes zones de saisie
	*/
	$('#dinosTable tbody').on( 'dblclick', 'tr', function () {
	    let dataRow = table.row( this ).data();
	    $("#id").val(dataRow.id);
		$("#name").val(dataRow.name);
		$("#diet").val(dataRow.diet);
		$("#weight").val(dataRow.weight);
		$("#id_era").val(dataRow.periode.idEra);

	} );
	
	// si vous cliquez sur le bouton click "btn-post"
	// on appelle la méthode "apprenant_submit()
	// en lui passant 2 paramètres : la référence du bouton pour le désactiver et la type de méthode, ici POST.
	$("#btn-post").click(function() {
		
		
		
		const conf = confirm("Etes-vous sûr de vouloir ajouter cette entrée?");
		if (conf){
			dinosaure_submit($("#btn-post"), "POST", table);
			
		}
	
	
	
	});

//	 si vous cliquez sur le bouton click "btn-put"
//	 on appelle la méthode "apprenant_submit()
//	 en lui passant 2 paramètres : la référence du bouton pour le désactiver et la type de méthode, ici PUT.
	$("#btn-put").click(function() {
		
		
		dinosaure_submit($("#btn-put"), "PUT", table);
	
	});

	//click on RESET
	$("#btn-reset").click(function() {
		
		resetForm(); // méthode qui met les valeurs des zones de textes du formulaire à blanc
		resetFeedBackDinos();
	});

	//click on GET
	$("#btn-get").click(function() {
		getDino(); // affiche l'apprenant(e) sélectionné(e) dans la DataTable
	});

	//click on DELETE
	$("#btn-delete").click(function() {
		deleteDino(); // efface l'apprenant en fonction de l'identifiant
		
		
	});
});

/**
 * Charge les données dans la DataTable (JQuery)
 * @returns
 */
function loadDatatable() {
	$('#dinosTable').DataTable({
		"columnDefs": [
	            {
	                "targets": [ 0 ],
	                "sortable" : false
	            },
	            {
	                "targets": [ 4 ],
	                "visible": true
	            }
	        ],
		"ajax" : {
			url : '/api/dinos',
			dataSrc : ''
		},
		"columns" : [ 
			{"data" : "id"},
			{"data" : "name"},
			{"data" : "diet"}, 
			{"data" : "weight"},
			{"data" : "periode.idEra"} ]
	});
	
}
/**
 * Méthode qui traite les POST et PUT
 * @param button
 * @param httpVerb
 * @returns
 */
function dinosaure_submit(button, httpVerb, table) {

	var dinosaure = {};
	// on récupère les valeurs saisies
	dinosaure["id"] = $("#id").val();
	dinosaure["name"] = $("#name").val();
	dinosaure["diet"] = $("#diet").val();
	dinosaure["weight"] = $("#weight").val();
	
	var idPeriode =  $("#id_era").val();
	var periode = {	idEra : idPeriode, nameEra : " " };
	dinosaure["periode"] = periode; //= $("#id_era").val();
	
	console.log(dinosaure);
	
	// on initialise l'url du back
	var url = "/api/adddino";
	
	// si c'est une modification, on passe l'identifiant
	if(httpVerb == "PUT")
		url += "/" + dinosaure["id"];
	
	// on désactive le bouton en cours 
	button.prop("disabled", true);

	// on lance la méthode ajax pour faire le lien avec les méthodes back du constructeur
	$.ajax({
		type : httpVerb,						// méthode POST ou PUT
		contentType : "application/json",		// type de données
		url : url,								// url destinatrice
		data : JSON.stringify(dinosaure),		// on transforme les données de la variable Javascript "dinosaure" en format JSON
		dataType : 'json',						// on précise le mode de transfert
		cache : false,							// pas de cache sollicité
		timeout : 600000,						// délai d'attente
		success : function(data) {				// si ok

			var json = "<h3>Server Response au format JSON</h3><pre>dinosaure (modifié/ajouté) :<br>" + JSON.stringify(data, null, 5) + "</pre>";
			
			$('#feedbackDinos').html(json); // renvoie les infos aux format JSON adapté au HTML dans la balise "<DIV id="feedbackDinos"> 

			console.log("SUCCESS : ", data);
			button.prop("disabled", false);

			resetForm()
		},
		error : function(e) {

			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackDinos').html(json);

			console.log("ERROR : ", e);
			button.prop("disabled", false);

		}
	});
	
	table.ajax.reload(); // on recharge les données via ajax et la méthode reload()
}

function resetForm() {
	$('#Dino-form')[0].reset();
}

function resetFeedBackDinos() {
	$('#feedbackDinos').html("");
}

/**
 * Méthode qui récupère un dino
 * @returns
 */
function getDino() {

	var idDino = $("#id").val(); // on récupère la variable

	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/api/dino/" + idDino,
		data : {},
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			var json = "<h3>Server Response format JSON</h3><pre>Dinosaure trouvé :<br>" + JSON.stringify(data, null, 4) + "</pre>";
			$('#feedbackDinos').html(json);
			$("#id").val(data.id);
			$("#name").val(data.name);
			$("#diet").val(data.diet);
			$("#weight").val(data.weight);
			$("#id_era").val(data.periode.idEra);

			console.log("SUCCESS : ", data);
		},
		error : function(e) {

			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackDinos').html(json);

			console.log("ERROR : ", e);
		}
	});
}

/**
 * méthode pour supprimer un dino
 * @returns
 */
function deleteDino() {

	var idDinosaure = $("#id").val();

	$.ajax({
		type : "DELETE",
		contentType : "application/json",
		url : "/api/deldino/" + idDinosaure,
//		data : {},
//		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			var json = "<h3>Server Response</h3><pre>Dinosaure " + idDinosaure + " deleted.</pre>";
			$('#feedbackDinos').html(json);
			console.log("SUCCESS : ", data);

			resetForm();
		},
		error : function(e) {
			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackDinos').html(json);
			console.log("ERROR : ", e);
		}
	});
	table.reload();
}
