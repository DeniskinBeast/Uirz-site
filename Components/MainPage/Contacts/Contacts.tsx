import Link from "next/link";
import React from "react";

export default function Contacts() {
    return (
        <div className="container" >
            <p className="text-center"><strong>Адрес: </strong>620031, Екатеринбург, пл.Октябрьская, 3</p>
            <p className="text-center"><strong>Почта: </strong>uirz@duma.midural.ru</p>
            <p className="text-center"><strong>Приемная директора: </strong>(343) 378-94-36</p>
            <p className="text-center"><strong>Бухгалтерия: </strong>(343) 362-15-39</p>
            <p className="text-center"><strong>Отдел разработки проектов нормативных правовых актов: </strong>(343) 378-93-25</p>
            <p className="text-center"><strong>Отдел систематизации законодательства и справочно-информационной работы: </strong>(343) 362-15-86</p>
            <p className="text-center"><strong>Организационно-правовой отдел: </strong>(343) 371-75-03</p>
            <p className="text-center">
                <Link href="/structure" as="/structure">
                    <a href="">Контакты сотрудников</a>
                </Link>
            </p>
        </div>
    )
}
