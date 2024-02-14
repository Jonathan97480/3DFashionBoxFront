import { useTranslation } from "react-multi-lang";

interface FilterInterface {
    urlApiFilter: string;
    data: (d: any) => void;
    setIsFilter: (f: boolean) => void;

}

const Filter = ({ urlApiFilter, data, setIsFilter }: FilterInterface) => {
    const t = useTranslation();

    const filter = {
        0: "neoGeo",
        101: "fba",
        3: "psx",
        7: "snes",
        6: "nes",
        8: "gba",
        9: "gbc",
        4: "n64",
        10: "md"
    }

    const handleFilter = async (value: number) => {

        try {
            const response = await fetch(`${urlApiFilter}` + value);
            const json = await response.json();
            if (json.success) {
                setIsFilter(true);
                data(json.data.games);
            } else {
                data([]);

            }

        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }



    return (

        <div className="filter">
            <h2>Filtre</h2>
            <div className="filter__contenaire">
                {
                    Object.keys(filter).map((key) => (

                        <button className="btn" key={key} onClick={() => handleFilter(parseInt(key))}>{t("table.filter." + filter[key as unknown as keyof typeof filter])}</button>
                    ))
                }
            </div>
        </div>


    )


}

export default Filter;
export type { FilterInterface };
