import React from "react";

//TODO зафишачить инфу в БД
export function ConstituentDocs() {
    return (
        <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card">
                    <img className="card-img-top" src="/contituent_docs/ustav_old.png" alt="Изображение документа"/>
                    <div className="card-body">
                        <p className="card-text text-center">
                            Устав государственного казённого учреждения Свердловской области «Уральский институт регионального законодательства» (утвержден указом Губернатора Свердловской области от 14 октября 2011 года № 904-УГ)
                        </p>
                    </div>
                    <div className="card-footer">
                        <a className="btn btn-outline-secondary card-button" href="/docs/constituent_docs/ustav2.pdf" target="_blank">Просмотр</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card">
                    <img className="card-img-top" src="/contituent_docs/ustav_recent.png" alt="Изображение документа"/>
                    <div className="card-body">
                        <p className="card-text text-center">
                            Устав государственного казённого учреждения Свердловской области «Уральский институт регионального законодательства» (со всеми изменениями)
                        </p>
                    </div>
                    <div className="card-footer">
                        <a className="btn btn-outline-secondary card-button" href="/docs/constituent_docs/ustav2019.pdf">Просмотр</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card">
                    <img className="card-img-top" src="/contituent_docs/ukaz.png" alt="Изображение документа"/>
                    <div className="card-body">
                        <p className="card-text text-center">
                            Указ Губернатора Свердловской области от 14 октября 2011 года № 904-УГ «О создании государственного казённого учреждения Свердловской области «Уральский институт регионального законодательства» путем изменения типа государственного учреждения Свердловской области «Уральский институт регионального законодательства»
                        </p>
                    </div>
                    <div className="card-footer">
                        <a className="btn btn-outline-secondary card-button" href="/docs/contituent_docs/ukaz2.pdf">Просмотр</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card">
                    <img className="card-img-top" src="/contituent_docs/svid1-800.gif" alt="Изображение документа"/>
                    <div className="card-body">
                        <p className="card-text text-center">
                            Свидетельство о государственной регистрации государственного учреждения Свердловской области «Уральский инстиут регионального законодательства»
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card">
                    <img className="card-img-top" src="/contituent_docs/svid2-800.gif" alt="Изображение документа"/>
                    <div className="card-body">
                        <p className="card-text text-center">
                            Свидетельство Министерства юстиции Российской Федерации об аккредитации государственного учреждения Свердловской области «Уральский инстиут регионального законодательства» в качестве независимого эксперта, уполномоченного на проведение экспертизы на коррупциогенность от 21 октября 2009 года № 494
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
