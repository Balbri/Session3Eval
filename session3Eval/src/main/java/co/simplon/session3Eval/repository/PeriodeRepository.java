package co.simplon.session3Eval.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import co.simplon.session3Eval.model.Periode;



/**
 * Interface pour l'entity Periode
 * 
 */
@RepositoryRestResource
public interface PeriodeRepository  extends JpaRepository<Periode, Integer> {

	 
}
