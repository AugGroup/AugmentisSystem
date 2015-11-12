package com.aug.services.utils;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aug.constants.Constants;

@Service
public class UploadService {
    private static final Logger log = Logger.getLogger(UploadService.class);
    @Value("#{appProps['picture.path']}")
    private String picpath;

    public String uploadImage(String module, String filename, MultipartFile image) throws RuntimeException, IOException {
        try {
            File file = new File(picpath + module + "/" + filename);
            FileUtils.writeByteArrayToFile(file, image.getBytes());
            log.info("Upload:  " + file.toString() + " complete.");
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
        return Constants.SUCCESS;
    }

    public String deleteImage(String module, String filename) throws RuntimeException, IOException {
        System.out.println("Expenses Delete Image");
        try {
            String sDestPath = picpath + module + "/" + filename;
            File fDelFile = new File(picpath + module + "/" + filename);
            System.out.println("Destination to Delete a image :" + sDestPath);
            fDelFile.delete();
            System.out.println("Image is Delete");
        } catch (Exception e) {

            e.printStackTrace();
            return e.getMessage();

        }
        return Constants.SUCCESS;
    }

    public static String uploadFile(String sSourcePath, String sDestFileName, String sAppRootPath, String sFolderPath) {
        try {
            String sDestPath = sAppRootPath + sFolderPath + sDestFileName;

            File fSourceFile = new File(sSourcePath);
            File fDestFile = new File(sDestPath);
            log.info("Source :" + sSourcePath);
            log.info("Destination :" + sDestPath);
            FileUtils.copyFile(fSourceFile, fDestFile);

        } catch (Exception e) {

            e.printStackTrace();
            return e.getMessage();

        }
        return Constants.SUCCESS;
    }

    public static String uploadZipFile(String sSourcePath, String sAppRootPath, String sContextPath, String sFolderPath) {
        try {
            String sDestPath = sAppRootPath + sContextPath + sFolderPath;

            File fSourceFile = new File(sSourcePath);
            File fDestFile = new File(sDestPath);
            log.info("Source :" + sSourcePath);
            log.info("Destination :" + sDestPath);
            FileUtils.copyFile(fSourceFile, fDestFile);
            log.info("UPLOAD ZIP FILE SUC");
        } catch (Exception e) {

            e.printStackTrace();
            return e.getMessage();

        }
        return Constants.SUCCESS;
    }

    public static String deleteFile(String sDestFileName, String sAppRootPath, String sContextPath, String sFolderPath) {
        System.out.println("Expenses Delete File");
        try {
            String sDestPath = sAppRootPath + sContextPath + sFolderPath + sDestFileName;
            File fDelFile = new File(sDestPath);
            System.out.println("Destination to Delete a file :" + sDestPath);
            fDelFile.delete();
            System.out.println("File is Delete");
        } catch (Exception e) {

            e.printStackTrace();
            return e.getMessage();

        }
        return Constants.SUCCESS;
    }

    public static String deleteFolderPath(String sAppRootPath, String sFolderPath) {
        System.out.println("Expenses Delete File");
        try {
            String sFolderFullPath = sAppRootPath + sFolderPath;
            File fDelFile = new File(sFolderFullPath);
            System.out.println("Destination to Delete a Folder :" + sFolderFullPath);
            fDelFile.delete();
            System.out.println("Folder is Delete");
        } catch (Exception e) {

            e.printStackTrace();
            return e.getMessage();

        }
        return Constants.SUCCESS;
    }

    public static String copyFileForClientSubmission(String sDestFileName, String sAppRootPath, String sContextPath, String sCopiedPath, String sFolderPath) {
        try {
            String sDestPath = sAppRootPath + sContextPath + sFolderPath + sDestFileName;
            String sCopyPath = sAppRootPath + sContextPath + sCopiedPath + sDestFileName;
            File fSourceFile = new File(sCopyPath);
            File fDestFile = new File(sDestPath);
            System.out.println("Source (copy) :" + sCopyPath);
            System.out.println("Destination :" + sDestPath);
            FileUtils.copyFile(fSourceFile, fDestFile);

        } catch (Exception e) {

            e.printStackTrace();
            return e.getMessage();

        }
        return Constants.SUCCESS;
    }
}

