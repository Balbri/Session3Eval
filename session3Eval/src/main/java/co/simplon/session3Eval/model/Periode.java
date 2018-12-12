package co.simplon.session3Eval.model;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude= {"idEra"})
@Entity
public class Periode implements Serializable {

	private static final long serialVersionUID = -208573937987755822L;
	@Id
	@GeneratedValue
	private int idEra;
	private String nameEra;
	@OneToMany
	private Collection<Dinosaure> dinosaures ;
}
