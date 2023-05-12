class Lampa
{
    #allapot;
    #koordinatak = {};
    #divElem;

    constructor(x, y, allapot, szuloElem)
    {
        this.#koordinatak["x"] = x;
        this.#koordinatak["y"] = y;
        this.#allapot = allapot;
        szuloElem.append(`<div class="${allapot ? "sarga" : "zold"}"></div>`);
        this.#divElem = szuloElem.children(":last-child");
        this.#kattintsTrigger();
    }

    setAllapot()
    {
        this.#allapot = !this.#allapot;
        this.#szinBeallit();
    }

    getAllapot()
    {
        return this.#allapot;
    }

    #szinBeallit()
    {
        this.#divElem.toggleClass("zold");
        this.#divElem.toggleClass("sarga");
    }

    #kattintsTrigger()
    {
        this.#divElem.on("click", () => window.dispatchEvent(new CustomEvent("kapcsolas", { detail: this })));
    }

    getKoordinatak()
    {
        return this.#koordinatak;
    }
}

export default Lampa;