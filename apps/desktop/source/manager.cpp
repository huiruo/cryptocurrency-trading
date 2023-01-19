#include "../include/Manager.h"
#include <QDebug>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QEventLoop>
#include <QJsonParseError>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>

const QString strategiesOrderApi = "strategy/order/getOrder";
const QString codelistApi = "data/center/codelist";

Manager::Manager(QObject *parent) : QObject(parent), total(10)
{
}

void Manager::setTotal(int newTotal)
{
    if (total == newTotal)
        return;
    total = newTotal;
    emit totalChanged(total);
}

int Manager::getTotal() const
{
    return total;
}

int Manager::getStrategy(void)
{
    qDebug() << "test2:";
    QString url = "strategy/order/getOrder";
    createRqust(url, 1);

    return 0;
}

void Manager::getCoins()
{
    QString url = "data/center/codelist";
    createRqust(url, 2);
}

void Manager::createRqust(QString url, int type)
{
    QNetworkRequest requestInfo;
    QString baseUrl = "http://192.168.1.107:1788/";
    requestInfo.setUrl(QUrl(baseUrl + url));
    requestInfo.setRawHeader("Content-Type", "application/json");

    QNetworkAccessManager *manager = new QNetworkAccessManager(this);
    connect(manager, &QNetworkAccessManager::finished, this, &Manager::replyFinished);
    if (type == 2)
    {
        // manager->get(QNetworkRequest(QUrl(baseUrl+url)));
        manager->get(requestInfo);
    }
    else
    {
        QJsonDocument doc;
        QJsonObject jsonData;
        jsonData.insert("currentPage", 1);
        jsonData.insert("pageSize", 10);
        jsonData.insert("is_running", 1);
        doc.setObject(jsonData);

        qDebug() << "url:" << doc.toJson();
        manager->post(requestInfo, doc.toJson());
    }
}

int Manager::replyFinished(QNetworkReply *reply)
{
    QString url = reply->url().toString();
    QString baseUrl = "http://192.168.1.107:1788/";
    QString urlTail = url.mid(baseUrl.length());
    qDebug() << "operation:" << reply->operation();
    qDebug() << "url:" << url;
    qDebug() << "raw header:" << reply->rawHeaderList();
    if (reply->error() != QNetworkReply::NoError)
    {
        qDebug() << "reply error:" << reply->errorString();
    }
    else
    {
        int statusCode = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();
        qDebug() << "statusCode:" << statusCode;
        if (statusCode != 200 && statusCode != 201)
        {
            qDebug() << "网络错误";
        }
        else
        {
            const QByteArray reply_data = reply->readAll();
            // qDebug()<<"read all:"<<reply_data;

            QJsonParseError json_error;
            QJsonDocument jsonDoc = QJsonDocument::fromJson(reply_data, &json_error);
            if (json_error.error == QJsonParseError::NoError)
            {
                if (jsonDoc.isObject())
                {
                    qDebug() << "test:";
                    // qDebug() << jsonDoc;
                    // 转化为root对象
                    QJsonObject rootObj = jsonDoc.object();

                    QJsonValue rootCodeValue = rootObj.value("code");
                    int code = rootCodeValue.toInt();
                    qDebug() << code;
                    if (code == 200)
                    {
                        if (urlTail == codelistApi)
                        {
                            QJsonArray list = rootObj.value("data").toArray();
                            qDebug() << list;
                            qDebug() << list.size();
                        }
                        else if (urlTail == strategiesOrderApi)
                        {
                            QJsonObject rootDataValue = rootObj.value("data").toObject();
                            int total = rootDataValue.value("total").toInt();
                            QJsonArray list = rootDataValue.value("res").toArray();
                            Manager::setTotal(total);
                            qDebug() << total;
                            qDebug() << list;
                        }
                    }
                    else
                    {
                        qDebug() << "请求错误";
                    }
                }
            }
            else
            {
                qDebug() << "json error:" << json_error.errorString();
            }
        }
    }
    // 清除
    reply->deleteLater();

    return 1;
}
