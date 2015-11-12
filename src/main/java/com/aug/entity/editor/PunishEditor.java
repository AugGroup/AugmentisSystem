package com.aug.entity.editor;

import java.beans.PropertyEditorSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.aug.hrdb.entities.Punish;
import com.aug.hrdb.services.PunishService;


@Component
public class PunishEditor extends PropertyEditorSupport {
	
	@Autowired
	private PunishService punishService;

	
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Punish rs = punishService.findById(Integer.valueOf(text));
			this.setValue(rs);
		}

	}

	public String getAsText() {
		String tx = "";
		Punish rs = (Punish) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}
	
}
