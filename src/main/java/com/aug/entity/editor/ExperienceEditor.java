package com.aug.entity.editor;

import java.beans.PropertyEditorSupport;

import org.springframework.beans.factory.annotation.Autowired;

import com.aug.hrdb.entities.Experience;
import com.aug.hrdb.services.ExperienceService;

public class ExperienceEditor extends PropertyEditorSupport {

	@Autowired private ExperienceService experienceService;
	
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Experience rs = experienceService.findById(Integer.valueOf(text));
			this.setValue(rs);
		}

	}

	public String getAsText() {
		String tx = "";
		Experience rs = (Experience) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}
}
