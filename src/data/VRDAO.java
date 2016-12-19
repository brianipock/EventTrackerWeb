package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.vr;

@Transactional
public class VRDAO {

	
	@PersistenceContext
	private EntityManager em;
	
	
	public List<vr> index(){
		  String query = "SELECT v FROM vr v";
		  return em.createQuery(query, vr.class).getResultList();
		}
	
	public vr showID(int id){
		return em.find(vr.class, id);
	}
	
	public vr updateVR(int id, vr vr) {
		vr vrUpdate = em.find(vr.class, id);
		em.persist(vrUpdate);
		return vrUpdate;
	}
	public vr createVR(vr newVr) {
	  
		em.persist(newVr);
	    // force EntityManager to persist immediately
	    em.flush();
	    // return the persisted user
	    return em.find(vr.class, newVr.getId());		
	}
	public vr deleteVr(int id) {
		vr v = em.find(vr.class, id);
		em.remove(v);
		return v;
	}
}
