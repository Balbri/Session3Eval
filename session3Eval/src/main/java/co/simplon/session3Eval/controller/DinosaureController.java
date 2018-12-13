package co.simplon.session3Eval.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.session3Eval.model.Dinosaure;
import co.simplon.session3Eval.model.Periode;

@RestController
@RequestMapping("/api")
public class DinosaureController {
Periode periode = new Periode();
	@Autowired
	private co.simplon.session3Eval.repository.DinosaureRepository dinoRepo;
	
	
	
	public DinosaureController() {}

	/**
	 * Retourner tous les dinos
	 * @return
	 */
	@RequestMapping(value = "/dinos", method = RequestMethod.GET)
	public ResponseEntity<?> getAllDinos(){
		List<Dinosaure> listeDinos = null;
		try {
			listeDinos = dinoRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeDinos);
	}
	
	/**
	 * rechercher
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/dino/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getDino(@PathVariable Integer id){
		Dinosaure dinosaure = null;
				
		try {
			dinosaure =(dinoRepo.findOne(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(dinosaure == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(dinosaure);
	}
	
	/**
	 * ajouter
	 * @param dino
	 * @return
	 */
	@RequestMapping(value = "/adddino", method = RequestMethod.POST)
	public ResponseEntity<?> addDino(@RequestBody Dinosaure dinosaure){
		Dinosaure resultDino = null;
		String name = dinosaure.getName();
		if((name == null) || (name.isEmpty()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom !");
		
			
		try {
			resultDino = dinoRepo.saveAndFlush(dinosaure);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).body(resultDino);
	}
	
	/**
	 * Mettre à jour
	 * @param apprenant
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/adddino/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateDino(@RequestBody Dinosaure dinosaure,@PathVariable Integer id) throws Exception {
		Dinosaure resultDinosaure = null;
		String name = dinosaure.getName();
		
		if((name == null) || (name.isEmpty()))
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prénom !");
				
		try {
			resultDinosaure = dinoRepo.save(dinosaure);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultDinosaure);
	}
	
	/**
	 * Détruire
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deldino/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteDinosaure(@PathVariable Integer id){
		try {
		dinoRepo.delete(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
}