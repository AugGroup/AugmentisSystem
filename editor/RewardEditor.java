package com.aug.hr.entity.editor;

import java.beans.PropertyEditorSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.aug.hrdb.entities.Reward;
import com.aug.hrdb.services.RewardService;



@Component
public class RewardEditor extends PropertyEditorSupport{
	
	@Autowired
	private RewardService rewardService;
	
	
	@Override
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Reward rs = rewardService.findById(Integer.valueOf(text));
			this.setValue(rs);
		}

	}
//	
	@Override
	public String getAsText() {
		String tx = "";
		Reward rs = (Reward) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}

}
