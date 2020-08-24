import React from "react";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {UpButton} from "../Components/UpButton/UpButton";

export default function LegalExpertisePage() {
    return (
        <>
            <Layout title="Правовая экспертиза нормативных правовых актов"/>
            <Navbar/>
            <div className="content">
                <Header/>
                <UpButton to="legal_expertise"/>
                <div className="container">
                <h1 id="legal_expertise" className="text-center page__title">Правовая экспертиза нормативных правовых актов</h1>
                    <p>Институт проводит правовую экспертизу проектов нормативных правовых актов Свердловской области и иных
                        документов, выполнение которой осуществляют <a href="?x=struc_otdel2" className="ref"> Экспертный
                            совет</a> и <a href="?x=struc_otdel3" className="ref">отдел разработки проектов нормативных
                            правовых актов</a>.</p> <p>В соответствии с Уставом Института <a href="?x=struc_otdel2"
                                                                                             className="ref"> Экспертный
                    совет</a> проводит экспертизу:</p>
                    <p>1) проектов законов Свердловской области, внесённых в порядке зако-нодательной инициативы в
                        Законодательное Собрание Свердловской области;</p>
                    <p>2) проектов законов Свердловской области, подготовленных для приня-тия на референдуме Свердловской
                        области;</p>
                    <p>3) проектов федеральных законов, подготовленных для рассмотрения в
                        Законодательном Собрании Свердловской области с целью направления их в
                        порядке законодательной инициативы в Государственную Думу Федерального
                        Собрания Российской Федерации;
                    </p>
                    <p>4) законов Свердловской области, на которые в Законодательное
                    Собрание Свердловской области направлены протесты заместителя
                    Генерального прокурора Российской Федерации, прокурора Свердловской
                    области или его заместителя.
                    </p>
                    <p>Результаты экспертизы правового акта отражаются в заключении <a href="?x=struc_otdel2"
                                                                                       className="ref"> Экспертного
                    совета</a>, которое утверждается простым большинством голосов присутствующих на заседании членов
                    Экспертного совета. </p>
                    <p><strong>По результатам проведения правовой экспертизы в 2008 году Экспертным советом подготовлено 142
                        заключения, в 2009 году – 164. </strong></p>
                    <h3 className="text-center page__title">В 2010 году Институтом подготовлены:</h3>
                    <p>216 заключений по проектам
                        законов Свердловской области, 6 заключений по проектам федеральных законов, 3 заключения по
                        вопросам, поставленным в экспертном заключении Главного управления Министерства юстиции Российской
                        Федерации по Свердловской области; 8 заключений по вопросам, поставленным в протестах Прокурора
                        Свердловской области на законы Свердловской области, противоречащие федеральному законодательству,
                        94 ответа в форме заключений, разъяснений и справок по другим вопросам, поставленным в обращениях
                        депутатов палат Законодательного Собрания Свердловской области, государственных органов Свердловской
                        области, органов местного самоуправления муниципальных образований и общественных организаций.</p>
                    <p>С 1 января 2011 года правовую экспертизу проектов нормативных правовых актов осуществляет <a
                        href="?x=struc_otdel2" className="ref"> Экспертный совет</a> и <a href="?x=struc_otdel3"
                                                                                          className="ref">отдел разработки
                        проектов нормативных правовых актов</a>.</p>

                    <h3 className="text-center page__title">В 2011 году Институтом подготовлено:</h3>
                    <p>230 заключений по проектам законов Свердловской
                        области; 18 заключений по проектам федеральных законов; 7 заключений по вопросам, поставленным в
                        протестах прокурора Свердловской области на законы Свердловской области, противоречащие федеральному
                        законодательству; 7 заключений по вопросам, поставленным в заключениях Главного управления
                        Министерства юстиции Российской Федерации по Свердловской области; 80 ответов в форме заключений,
                        разъяснений и справок по другим вопросам, поставленным в обращениях депутатов палат
                        Законода-тельного Собрания Свердловской области, государственных органов Свердловской области. </p>

                    <h3 className="text-center page__title">В 2012 году Институтом подготовлено:</h3>
                    <p> 1)<strong> 157 </strong>заключений по проектам законов Свердловской области; </p>
                    <p> 2) <strong>31 </strong>заключение, содержащее анализ законодательства Российской Федерации и
                        законодательства Свердловской области;</p>
                    <p> 3) <strong>46 </strong>ответов на письма, содержащих правовые вопросы, поступившие в Институт от
                        областных исполнительных органов государственной власти Свердловской области;</p>
                    <p> 4) <strong>5</strong> заключений по вопросам, поставленным в протестах прокурора Свердловской
                        области на законы Свердловской области, противоречащие федеральному законодательству. </p>
                    <h3 className="text-center page__title">В 2013 году Институтом подготовлены и направлены:</h3>
                    <p>1) председателю Законодательного Собрания Свердловской области 166 заключений по проектам законов
                        Свердловской области, внесенных в Законодательное Собрание Свердловской области в порядке
                        законодательной инициативы, 6 заключений на проекты федеральных законов, 19 заключений, содержащих
                        анализ федерального законодательства и законодательства Свердловской области, 21 ответ на письма,
                        содержащие правовые вопросы; </p>
                    <p>2) Вице-губернатору Свердловской области - Руководителю Администрации Губернатора Свердловской
                        области 2 заключения по проектам законов Свердловской области; </p>
                    <p>3) председателю Правительства Свердловской области и его заместителям 8 заключений по проектам
                        законов Свердловской области и 15 заключений, содержащих анализ федерального законодательства и
                        законодательства Свердловской области; </p>
                    <p>4) в областные исполнительные органы государственной власти Свердловской области 8 заключений по
                        проектам законов Свердловской области, 16 ответов на письма, содержащие правовые вопросы. </p>

                    <h3 className="text-center page__title">В 2014 году Институтом подготовлено и направлено: </h3>
                    <p> 1) Председателю Законодательного Собрания Свердловской области 148 заключений по проектам законов
                        Свердловской области, внесенных в Законодательное Собрание Свердловской области в порядке
                        законодательной инициативы, 4 заключения на проекты федеральных законов, 20 заключений, содержащих
                        анализ федерального законодательства и законодательства Свердловской области, 10 ответов на письма,
                        содержащие правовые вопросы; </p>
                    <p> 2) в Администрацию Губернатора Свердловской области 11 заключений, содержащие анализ федерального
                        законодательства и законодательства Свердловской области; </p>
                    <p> 3) Председателю Правительства Свердловской области и его заместителям 8 заключений по проектам
                        законов Свердловской области и 8 заключений, содержащих анализ федерального законодательства и
                        законодательства Свердловской области; </p>
                    <p> 4) в областные исполнительные органы государственной власти Свердловской области 13 заключений по
                        проектам законов Свердловской области, 33 ответа на письма, содержащие правовые вопросы; </p>
                    <p> 5) в Прокуратуру Свердловской области и в Главное управление Министерства внутренних дел Российской
                        Федерации по Свердловской области 2 заключения по проектам законов Свердловской области.</p>
                    <p> 6) в иные государственные, муниципальные органы и общественные организации 4 ответа на письма,
                        содержащие правовые вопросы.</p>

                    <h3 className="text-center page__title">В 2015 году Институтом подготовлено и направлено:</h3>
                        <p>1) Председателю Законодательного Собрания Свердловской области 186 заключений по проектам законов
                            Свердловской области, внесенных в Законодательное Собрание Свердловской области в порядке
                            законодательной инициативы, 2 заключения на проекты федеральных законов, 2 заключения по
                            вопросам, изложенным в протестах Прокурора Свердловской области; </p>
                        <p>2) в Законодательное Собрание Свердловской области, 4 заключения на проекты законов Свердловской
                            области, 24 заключения, основанные на анализе федерального законодательства и законодательства
                            Свердловской области, в том числе письма, содержащие ответы на правовые вопросы, предложения в
                            план законопроектной работы Законодательного Собрания Свердловской области на 2016 год; </p>
                        <p>3) в Правительство Свердловской области 2 заключения на проекты законов Свердловской области , 3
                            заключения на проекты федеральных законов, 14 заключений, основанных на анализе федерального
                            законодательства и законодательства Свердловской области, в том числе писем, содержащих ответы
                            на правовые вопросы; </p>
                        <p>4) в Администрацию Губернатора Свердловской области заключение на проект закона Свердловской
                            области, заключение на проект федерального закона и 8 заключений, основанных на анализе
                            федерального законодательства и законодательства Свердловской области, в том числе писем,
                            содержащих ответы на правовые вопросы; </p>
                        <p>5) руководителям исполнительных органов государственной власти Свердловской области 16 заключений
                            на проекты законов Свердловской области, заключение на проект федерального закона и 36
                            заключений, основанных на анализе федерального законодательства и законодательства Свердловской
                            области, в том числе писем, содержащих ответы на правовые вопросы; </p>
                        <p>6) в Прокуратуру Свердловской области заключение на проект закона Свердловской области и 2
                            заключения по правовым вопросам; </p>
                        <p>7) начальнику Государственно-правового управления Президента Российской Федерации письмо,
                            содержащее правовой вопрос; директору Департамента по обеспечению деятельности мировых судей
                            Свердловской области заключение на проект закона Свердловской области; главам муниципальных
                            образования 2 заключения, содержащие правовые вопросы; директору аналитического центра "Эксперт"
                            заключение на проект закона Свердловской области и начальнику Главного управления Министерства
                            Российской Федерации по делам гражданской обороны, чрезвычайным ситуациям и ликвидации
                            последствий стихийных бедствий по Свердловской области заключение по правовым вопросам. </p>
                        <p>Институтом подготовлены 3 обзора законодательства Российской Федерации и законодательства
                            субъектов Российской Федерации. </p>

                        <h3 className="text-center page__title">В 2016 году Институтом подготовлено и направлено: </h3>

                        <p>1) Председателю Законодательного Собрания Свердловской области 198 заключений по проектам законов
                            Свердловской области, внесенных в Законодательное Собрание Свердловской области в порядке
                            законодательной инициативы, 10 заключений на проекты федеральных законов, заключение по
                            вопросам, изложенным в протесте Прокурора Свердловской области; </p>
                        <p>2) в Законодательное Собрание Свердловской области 2 заключения на проекты законов Свердловской
                            области, 13 писем, содержащих ответы на правовые вопросы, предложения в план законопроектной
                            работы Законодательного Собрания Свердловской области на 2017 год; </p>
                        <p>3) в Правительство Свердловской области 2 заключения на проекты законов Свердловской области и 17
                            писем, содержащих ответы на правовые вопросы; </p>
                        <p>4) в Администрацию Губернатора Свердловской области 11 писем, содержащих ответы на правовые
                            вопросы; </p>
                        <p>5) руководителям исполнительных органов государственной власти Свердловской области 6 заключений
                            на проекты законов Свердловской области и 43 письма, содержащих ответы на правовые вопросы; </p>
                        <p>Подготовлены и направлены письма, содержащие ответы на правовые вопросы: </p>
                        <p>1) Главному федеральному инспектору по Свердловской области аппарата Полномочного представителя
                            Президента Российской Федерации в Уральском федеральном округе; </p>
                        <p>2) председателю Нижнетагильской городской Думы; </p>
                        <p>3) председателю Региональной энергетической комиссии Свердловской области; </p>
                        <p>4) председателю Счетной палате Свердловской области; </p>
                        <p>5) главе Шалинского городского округа. </p>
                        <p>Институтом подготовлены иные документы (таблицы, справки правового характера). </p>
                        <p>Институтом подготовлен и направлен в Законодательное Собрание Свердловской области обзор
                            законодательства Российской Федерации и законодательства субъектов Российской Федерации.
                        </p>

                        <h3 className="text-center page__title">В 2017 году Институтом подготовлено и направлено: </h3>
                        <p>1) в Законодательное Собрание Свердловской области 142 заключения по проектам законов
                            Свердловской области, внесенных в Законодательное Собрание Свердловской области в порядке
                            законодательной инициативы (168 страниц); </p>
                        <p>- 2 заключения на проекты федеральных законов (6 страниц); </p>
                        <p>- 4 заключения на проекты постановлений Законодательного Собрания Свердловской области (7
                            страниц); </p>
                        <p>- 18 писем, содержащих ответы на правовые вопросы (46 страниц); </p>
                        <p>- иные документы (20 страниц); </p>
                        <p>- предложения в план законопроектной работы Законодательного Собрания Свердловской области на
                            2018 год (6 страниц); </p>
                        <p>2) в Администрацию Губернатора Свердловской области: </p>
                        <p>- заключение на проект федерального закона (4 страницы); </p>
                        <p>- заключение на проект закона Свердловской области (1 страница); </p>
                        <p>- 18 писем, содержащих ответы на правовые вопросы (64 страницы); </p>
                        <p>3) руководителям исполнительных органов государственной власти Свердловской области: </p>
                        <p>- 7 заключений на проекты законов Свердловской области (24 страницы); </p>
                        <p>- 52 письма, содержащие ответы на правовые вопросы (119 страниц); </p>
                        <p>4) руководителям иных государственных органов Свердловской области, органов местного
                            самоуправления, государственных, муниципальных учреждений и предприятий 7 ответов на письма,
                            содержащие правовые вопросы (24 страницы); </p>
                        <p>5) в Администрацию Губернатора Свердловской области и Законодательное Собрание Свердловской
                            области 3 обзора законодательства субъектов Российской Федерации (38 страниц); </p>
                        <p>6) в государственные органы Свердловской области иные документы (таблицы, справочная информация
                            правового характера) (155 страниц). </p>

                        <h3 className="text-center page__title">В 2018 году Институтом подготовлено и направлено: </h3>
                        <p>1) Губернатору Свердловской области Е.В. Куйвашеву 2 письма, содержащие информацию по правовым
                            вопросам (30 страниц); </p>
                        <p>2) в Законодательное Собрание Свердловской области: </p>
                        <p>- 172 заключения по проектам законов Свердловской области, внесенных в Законодательное Собрание
                            Свердловской области в порядке законодательной инициативы (179 страниц); </p>
                        <p>- 2 заключения на проекты федеральных законов (2 страницы); </p>
                        <p>- 4 заключения на проекты постановлений Законодательного Собрания Свердловской области (14
                            страниц); </p>
                        <p>- предложения в План законопроектной работы Законодательного Собрания Свердловской области на
                            2019 год (2 страницы); </p>
                        <p>- заключение на проект федерального закона «О патриотическом воспитании в Российской Федерации»
                            (3 страницы) и на проект закона Свердловской области «О муниципальном жилищном контроле» (2
                            страницы); </p>
                        <p>- 8 заключений на проекты постановлений Законодательного Собрания Свердловской области (21
                            страница); </p>
                        <p>- 20 писем, содержащих информацию по правовым вопросам (45 страниц); </p>
                        <p>3) первым заместителям Губернатора Свердловской области, заместителям Губернатора Свердловской
                            области, в Администрацию Губернатора Свердловской области, в Аппарат Губернатора Свердловской
                            области и Правительства Свердловской области: </p>
                        <p>- 7 заключений на проекты законов Свердловской области (28 страниц); </p>
                        <p>- 3 заключения на проекты иных нормативных правовых актов Свердловской области (10 страниц); </p>
                        <p>- 21 письмо, содержащее информацию по правовым вопросам (68 страниц); </p>
                        <p>4) руководителям исполнительных органов государственной власти Свердловской области: </p>
                        <p>- заключение на проект федерального закона «О внесении изменения в статью 7.23 Кодекса Российской
                            Федерации об административных правонарушениях» (4 страницы); </p>
                        <p>- 16 заключений на проекты законов Свердловской области (58 страниц); </p>
                        <p>- 73 письма, содержащие ответы на правовые вопросы (166 страниц); </p>
                        <p>5) иным должностным лицам 4 письма, содержащие ответы на правовые вопросы (8 страниц); </p>
                        <p>6) в государственные органы иные документы (таблицы, справочная информация правового характера)
                            (77 страниц); </p>

                        <h3 className="text-center page__title">В 2019 году Институтом подготовлено и направлено: </h3>
                        <p>1) в Законодательное Собрание Свердловской области: </p>
                        <p>- 2 заключения на проекты федеральных законов (8 страниц); </p>
                        <p>- заключение на проект закона (3 страницы) и заключение на поправ-ку к проекту закона
                            Свердловской области (2 страницы); </p>
                        <p>- 20 заключений на проекты постановлений Законодательного Собрания Свердловской области (26
                            страниц); </p>
                        <p>- таблица поправок к проекту постановления Законодательного Со-брания Свердловской области (4
                            страницы); </p>
                        <p>- предложения в План законопроектной работы Законодательного Собрания Свердловской области на
                            2020 год (6 страниц). </p>
                        <p>- 15 писем, содержащих информацию по правовым вопросам (39 страниц); </p>
                        <p>2) Вице-губернатору Свердловской области, Первому Заместителю Губернатора Свердловской области,
                            Заместителю Губернатора Свердловской области – Руководителю Аппарата Губернатора Свердловской
                            области и Пра-вительства Свердловской области, иным заместителям Губернатора Свердлов-ской
                            области: </p>
                        <p>- заключение на проект указа Губернатора Свердловской области
                            (3 страницы); </p>
                        <p>- заключение на проект постановления Правительства Свердловской области (4 страницы); </p>
                        <p>- 34 письма, содержащих информацию по правовым вопросам (86 страниц); </p>
                        <p>3) руководителям исполнительных органов государственной власти Свердловской области:</p>
                    <p>- 3 заключения на проекты федеральных законов (7 страниц); </p>
                    <p>- 9 заключений на проекты законов Свердловской области (26 стра-ниц); </p>
                    <p>- заключение на Закон Пермского края от 13 сентября 2016 года
                        № 684-ПК «О регулировании отдельных отношений в сфере деятельности пунктов переработки древесины на
                        территории Пермского края» (4 страницы); </p>
                    <p>- заключение на проект соглашения об описании местоположения границы между Свердловской областью и
                        Республикой Башкортостан (2 стра-ницы); </p>
                    <p>- заключение на проект соглашения между Министерством Россий-ской Федерации по делам гражданской
                        обороны, чрезвычайным ситуациям и ликвидации последствий стихийных бедствий и Правительством
                        Свердловской области (4 страницы); </p>
                    <p>- заключение на проект постановления Правительства Свердловской области (2 страницы); </p>
                    <p>- 49 писем, содержащих ответы на правовые вопросы (106 страниц); </p>
                    <p>4) иным должностным лицам 15 писем, содержащих ответы на правовые вопросы (33 страницы); </p>
                    <p>5) в Екатеринбургскую городскую Думу проекты решений Екатерин-бургской городской Думы (4 страницы) и
                        проект письма Екатеринбургской городской Думы о направлении в Законодательное Собрание Свердловской
                        области проекта закона Свердловской области и предложения о присвоении наименования
                        административно-территориальной единице Свердловской области (2 страницы); </p>
                    <p>6) в государственные органы Свердловской области иные документы (таблицы, справочная информация
                        правового характера) (164 страницы). </p>
                    <p>Руководство Института приняло участие в 12 заседаниях Законода-тельного Собрания Свердловской
                        области. </p>
                    <p>Руководство и работники Института приняли активное участие в со-вещаниях, заседаниях «круглого
                        стола», конференциях, заседаниях рабочих групп и комиссий, проводимых Законодательным Собранием
                        Свердловской области, Правительством Свердловской области, Аппаратом Губернатора Свердловской
                        области и Правительства Свердловской области, областными исполнительными органами государственной
                        власти Свердловской области, иными органами и организациями. </p>
                    <p>Работниками Института осуществлялось консультирование по правовым вопросам работников исполнительных
                        органов государственной власти Свердловской области, других государственных органов Свердловской
                        области и органов местного самоуправления муниципальных образований, расположенных на территории
                        Свердловской области. </p>
                </div>
            </div>
            <Footer/>
        </>
    )
}
