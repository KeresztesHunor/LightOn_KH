import Lampa from "./Lampa.js";

class Jatekter
{
    #db;
    #allapotLista = [];
    #meret;
    #lepes;

    constructor()
    {
        this.#meret = 3;
        const JATEKTER = $("#jatekter");
        for (let y = 0; y < this.#meret; y++)
        {
            this.#allapotLista.push((() => {
                const LISTA = [];
                for (let x = 0; x < this.#meret; x++)
                {
                    const FELKAPCSOLVA = Math.random() < 0.5;
                    LISTA.push(new Lampa(x, y, FELKAPCSOLVA, JATEKTER));
                    if (FELKAPCSOLVA)
                    {
                        this.#db++;
                    }
                }
                return LISTA;
            })());
        }
        this.#ellenorzes();
        this.#lepes = 0;
        $(window).on("kapcsolas", event => {
            event.detail.setAllapot();
            this.#setAllapotLista(event.detail.getKoordinatak());
            this.#ellenorzes();
            this.#lepes++;
        });
        const UJ_JATEK_GOMB = $("#ujJatekGomb");
        UJ_JATEK_GOMB.on("click", () => this.#init());
    }

    #setAllapotLista(koordinatak)
    {
        const X = koordinatak.x;
        const Y = koordinatak.y;
        this.#szomszedokKeresese(X + 1, Y);
        this.#szomszedokKeresese(X - 1, Y);
        this.#szomszedokKeresese(X, Y + 1);
        this.#szomszedokKeresese(X, Y - 1);
    }

    #szomszedokKeresese(x, y)
    {
        if (x >= 0 && x < this.#meret && y >= 0 && y < this.#meret)
        {
            this.#allapotLista[y][x].setAllapot();
        }
    }

    #init()
    {
        this.#db = 0;
        for (let y = 0; y < this.#meret; y++)
        {
            for (let x = 0; x < this.#meret; x++)
            {
                const LAMPA = this.#allapotLista[y][x];
                if (Math.random() < 0.5)
                {
                    LAMPA.setAllapot();
                }
                if (!LAMPA.getAllapot())
                {
                    this.#db++;
                }
            }
        }
        this.#ellenorzes();
    }

    #ellenorzes()
    {
        this.#db = 0;
        for (let y = 0; y < this.#meret; y++)
        {
            for (let x = 0; x < this.#meret; x++)
            {
                if (this.#allapotLista[y][x].getAllapot())
                {
                    this.#db++;
                }
            }
        }
        const LEKAPCSOLT_LAMPAK_SZAMA = $("#lekapcsoltLampakSzama");
        LEKAPCSOLT_LAMPAK_SZAMA.html(this.#db);
    }
}

export default Jatekter;