package com.trader.utils;

import java.util.List;

/**
 * 描述：
 */
public class UserInfo {

  /**
   * data : {"chapterTops":[],"collectIds":[],"email":"","icon":"","id":12662,"password":"","token":"","type":0,"account":"15294792877"}
   * errorCode : 0
   * errorMsg :
   */

  private DataBean data;
  private int errorCode;
  private String errorMsg;

  public DataBean getData() {
    return data;
  }

  public void setData(DataBean data) {
    this.data = data;
  }

  public int getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(int errorCode) {
    this.errorCode = errorCode;
  }

  public String getErrorMsg() {
    return errorMsg;
  }

  public void setErrorMsg(String errorMsg) {
    this.errorMsg = errorMsg;
  }

  public static class DataBean {

    /**
     * chapterTops : []
     * collectIds : []
     * email :
     * icon :
     * id : 12662
     * password :
     * token :
     * type : 0
     * account : 15294792877
     */

    private String email;
    private String icon;
    private int id;
    private String password;
    private String token;
    private int type;
    private String account;
    private List<?> chapterTops;
    private List<?> collectIds;

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getIcon() {
      return icon;
    }

    public void setIcon(String icon) {
      this.icon = icon;
    }

    public int getId() {
      return id;
    }

    public void setId(int id) {
      this.id = id;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }

    public String getToken() {
      return token;
    }

    public void setToken(String token) {
      this.token = token;
    }

    public int getType() {
      return type;
    }

    public void setType(int type) {
      this.type = type;
    }

    public String getUsername() {
      return account;
    }

    public void setUsername(String account) {
      this.account = account;
    }

    public List<?> getChapterTops() {
      return chapterTops;
    }

    public void setChapterTops(List<?> chapterTops) {
      this.chapterTops = chapterTops;
    }

    public List<?> getCollectIds() {
      return collectIds;
    }

    public void setCollectIds(List<?> collectIds) {
      this.collectIds = collectIds;
    }

    @Override
    public String toString() {
      return "DataBean{" +
          "email='" + email + '\'' +
          ", icon='" + icon + '\'' +
          ", id=" + id +
          ", password='" + password + '\'' +
          ", token='" + token + '\'' +
          ", type=" + type +
          ", account='" + account + '\'' +
          ", chapterTops=" + chapterTops +
          ", collectIds=" + collectIds +
          '}';
    }
  }

  @Override
  public String toString() {
    return "UserInfo{" +
        "data=" + data +
        ", errorCode=" + errorCode +
        ", errorMsg='" + errorMsg + '\'' +
        '}';
  }
}
