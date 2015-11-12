package com.aug.exception;

public class CustomExceptionMassageJson {
	
	private static final long serialVersionUID = 1L;	
	private String status;
	private String errMsg;
	
	public CustomExceptionMassageJson() {
		
	}
	
	public CustomExceptionMassageJson(String status, String errMsg) {
		this.status = status;
		this.errMsg = errMsg;
	}

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getErrMsg() {
		return errMsg;
	}
	
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	
	

}
