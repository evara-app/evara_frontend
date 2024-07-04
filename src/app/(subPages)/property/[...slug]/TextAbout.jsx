import React from "react";

function TextAbout({ readMore, data }) {
  return (
    <div
      className={`text-sm leading-6 mb-2 ${
        readMore ? "h-full" : "max-h-[190px] overflow-hidden"
      } `}
    >
      {/* <p>
        Nefes Marin Project Nefes Marin project is located in the Pendik
        district in the Asian side of Istanbul. Pendik district is one of the
        important areas in the Asian side of Istanbul. It is on the northern
        side of it, overlooking the Sea of Marmara, and Sabiha International
        Airport, the second airport in Istanbul, is located in it. This area
        covers an area of 278 square kilometers, and it is characterized by the
        beauty of its nature and the mildness of its climate. It includes a
        number of archaeological and tourist areas, and a number of
        distinguished gardens. The region contains vital facilities, which makes
        it a stand-alone city. It includes a group of traditional markets and
        large modern malls, and it has branches for most government departments
        and Turkish banks and a number of Turkish universities, including Pendik
        University and Marmara University, as well as a group of public and
        private schools for all ages for pre-university education, and a number
        Of the cultural centers and a number of distinguished hospitals and
        medical centers, and a group of hotels, restaurants and theaters. It
        also includes all the necessary service facilities and means of
        transportation. Because of its beautiful nature, sea view, and its
        richness in vital facilities and beautiful parks, it witnessed a rich
        social life accompanied by a distinguished urban renaissance, and
        witnessed a demand for residence and commercial and real estate
        investment. The region is connected to the European part of Istanbul by
        highways that pass over and under the Bosphorus Strait, and the metro
        passes alongside it, heading from the gates of Sabiha Airport to the
        European part of the city. It is half an hour away from Taksim Square in
        the center of the European section by car. Trains heading to the regions
        of Ankara and Konya depart from this area. The project consists of 3
        buildings, and the project contains 80 apartments of different sizes and
        styles, starting from 3 + 1 to 5 + 2. The project is characterized by
        its view of the sea and the city, as well as its strategic location,
        where: It is 5 minutes from the E5 highway. 10 minutes from (tavshan
        Tepe) Metro Metro Station. 5 minutes from (Marmaray) metro station. 7
        minutes from the (Astamarin) Shopping Center. 15 minutes from (Sabiha)
        Airport. 70 km from (Istanbul new airport). 33 minutes from (Sultan
        Mohammad Fateh) bridge. 2 minutes from the nearest school and hospital.
        Nefes Marin project’s social facilities Security service 24 hours a day.
        parking . Children’s park. smart home system. Underfloor heating system.
        Car wash. How to pay the price in cases of sale: It can be by paying the
        full amount at the time of the contract. Or by installments, where 50%
        of the value of the property is paid as a first payment, at the time of
        the contract, and the rest is paid in installments for a period of 12
        months. In addition, it is one of the projects suitable for obtaining
        Turkish citizenship for people wishing to obtain citizenship through
        real estate ownership. The project is under construction and will be
        delivered at the end of 2023.
      </p> */}
      <p>{data}</p>
    </div>
  );
}

export default TextAbout;
