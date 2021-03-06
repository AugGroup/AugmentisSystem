package com.aug.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service(value = "downloadService")
public class DownloadService {
	
	@Value("#{appProps['file.path']}")
	private String picpath;
	
	public String download(HttpServletRequest request,HttpServletResponse response,String module,String filename){
		FileInputStream inputStream = null;
		OutputStream outStream = null;
		
		ServletContext context = request.getServletContext();
		
		File downloadFile = new File( picpath+module+"/"+ filename);

		
		try {
			inputStream = new FileInputStream(downloadFile);
 
			response.setContentLength((int) downloadFile.length());
			response.setContentType(context.getMimeType("application/octet-stream"));		
			
			// response header
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment;filename=" + filename);
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setHeader(headerKey, headerValue);
 
			// Write response
			outStream = response.getOutputStream();
			IOUtils.copy(inputStream, outStream);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (null != inputStream)
					inputStream.close();
				if (null != inputStream)
					outStream.flush();
					outStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
 
		}
		
		return "SUCCESS";
	}
}
