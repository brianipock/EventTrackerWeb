package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.VRDAO;
import entities.vr;

@RestController
public class VRController {
	@Autowired 
	private VRDAO VRDAO;
	
	@RequestMapping(value = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	@RequestMapping(value = "vr", method = RequestMethod.GET)
	public List<vr> index() {
		System.out.println("in /api/vr");
		return VRDAO.index();
	}
	@RequestMapping(value = "vr/{id}", method = RequestMethod.GET)
	public vr showID(@PathVariable int id) {
		return VRDAO.showID(id);
	}
	@RequestMapping(value = "vr/{id}", method = RequestMethod.PUT)
	public vr updateVR(@PathVariable int id, @RequestBody String vrJSON) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			vr newVr = mapper.readValue(vrJSON, vr.class);
			return VRDAO.updateVR(id, newVr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new vr();
	}
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public vr createVr(@RequestBody String vrJSON) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			vr newVR = mapper.readValue(vrJSON, vr.class);
			return VRDAO.createVR(newVR);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new vr();
		// return quizDAO.createUser(userJSON);
	}

	@RequestMapping(value = "vr/{id}", method = RequestMethod.DELETE)
	public vr deleteVr(@PathVariable int id) {
		return VRDAO.deleteVr(id);
	}

}
