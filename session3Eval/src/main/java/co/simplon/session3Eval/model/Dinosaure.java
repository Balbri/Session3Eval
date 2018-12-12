package co.simplon.session3Eval.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude= {"id"})
@Entity
public class Dinosaure implements Serializable {

	private static final long serialVersionUID = -4053666880010035180L;
	@GeneratedValue
	@Id
	private int id;
	private String name;
	private String diet;
	@ManyToOne
	private Periode periode;
	
	

}