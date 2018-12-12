package co.simplon.session3Eval.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import co.simplon.session3Eval.model.Dinosaure;



/**
 * Interface pour l'entity Dinosaure
 * 
 */
@RepositoryRestResource
public interface DinosaureRepository  extends JpaRepository<Dinosaure, Integer> {

	
}
