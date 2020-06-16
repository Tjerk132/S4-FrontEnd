import { MLanguage } from 'vue-multilanguage';

export default
    new MLanguage('Nederlands').create({

        homePage: 'Home pagina',
        homeTitle: 'Hoi {0}!',
        homeGreeting: 'Welkom bij de producten winkel!',

        productPage: 'Producten pagina',
        category: 'Categorie',
        productCategory: 'Producten voor de categorie: {c}',
        productsAll: 'Alle producten',
        NoProductsFound: 'Geen producten gevonden voor deze categorie',

        scrollToTop: 'naar boven scrollen',

        description: 'Beschrijving',
        addToCart: 'Aan winkelwagen toevoegen',
        details: 'Details',
        stockCount: 'In de voorraad',
        reviewCount: 'Aantal reviews',
        inStock: '{s} in de voorraad',
        outOfStock: 'Geen op voorraad!',
        notEnoughInStock: 'Niet genoeg van dit product in de voorraad',
        review: '{r} review',
        reviews: '{r} reviews',
        Productprice: 'Prijs: {p}',

        onPage: 'Momenteel op pagina {p} van {m}',

        noItemsInCart: 'Je hebt momenteel geen producten in je winkelwagen',
        itemsInCart: 'Je winkelwagen bevat {p} producten',
        itemInCart: 'Je winkelwagen bevat 1 product',
        shoppingCartAdjusted: 'Winkelwagen aangepast',
        shoppingCartCountAdjusted: 'Je hebt nu {p} producten in je winkelwagen!',

        quantity: 'Aantal',
        name: 'Naam',
        price: 'Prijs',

        remove: 'Verwijder',
        add: 'Toevoegen',

        shoppingcart: 'Winkelwagen',

        buyProducts: 'Koop de producten',
        totalCosts: 'Totale kosten {c}',

        detailsFor: 'Details voor {p}',
        reviewsFor: 'Reviews voor {p}',

        noReviewsYet: 'No geen reviews voor dit product...',

        createReview: 'Maak een review',
        reviewTitle: 'Titel',
        starRating: 'Ster beoordeling',
        submitProCon: 'Druk op {k} om toe te voegen',
        prosAndCons: 'Pros en Cons',
        addPro: 'Voeg een pro toe',
        addCon: 'Voeg een con toe',
        content: 'Inhoud',
        submit: 'Verstuur',

        reviewUseful: 'Was deze review nuttig?',

        showMoreReviews: 'Laat meer reviews zien',
        showLessReviews: 'Laat minder reviews zien',

        numberOfReviews: 'Aantal reviews: {r}',
        outOf: 'van de {t}',

        registerMessage: 'Vul dit formulier in om een account aan te maken',
        username: 'Gebruikersnaam',
        password: 'Wachtwoord',
        repeatPassword: 'Herhaal wachtwoord',
        passwordsDontMatch: 'De wachtwoorden komen niet overeen',
        emailIncorrect: 'Gelieve een geldig emailaddress in te vullen',
        oneOrMoreFieldsIncorrect: 'Een of meerdere velden waren niet correct ingevuld',

        rememberMe: 'Onthoud me',
        byCreatingAccount: 'Door een account aan te maken gaat u akkoord met onze ',

        register: 'Registreren',
        registerAlreadyExists: 'Een gebruiker met die gebruikersnaam bestaat al',
        registerSuccess: 'registreren successvol, Je bent nu ingelogd',

        loginMessage: 'Vul dit formulier in om in te loggen',

        cancel: 'Annuleren',
        login: 'Inloggen',
        notLoggedIn: 'Je bent niet ingelogd',
        loginSuccess: 'Login success',
        loginFailed: 'Niet in staat om in te loggen ({c})',
        logout: 'Uitloggen',

        viewAll: 'Bekijk alle',
        categories: 'categorieën {0}',

        products: 'Producten',

        changeLanguage: 'Verander van taal',

        result: '1 resultaat voor {q}',
        results: '{r} resultaten voor {q}',
        noResults: 'Geen resultaten voor {q}',
        noResultsInfo: 'Sorry, maar er uw zoekcriteria hebben geen resultaten opgeleverd, probeer het nog eens met andere zoekwoorden',

        notFound: 'Niet gevonden',
        unableToFind: 'Het pad {p} is niet gevonden',
        home: 'Home',
        goBack: 'Ga terug',

        search: 'Zoeken',
        suggestions: 'Suggesties ({s})',
        searchedBefore: 'Je zocht eerder',
        searchFor: 'Zoek voor...',

        suggestionsByCategory: 'Suggesties voor categorie {c}',
        topRatedFromStore: 'Best beoordeelde producten van de winkel',

        successSendEmail: 'Een email is successvol verstuurd naar het emailaddress die behoort bij uw account',
        errorSendEmail: 'Er ging iets mis bij het verzenden van de email',

        modifyProductPage: 'Product aanpassen',
        editProductBtn: 'Pas product aan',
        editProduct: 'Pas product {p} aan',
        save: 'Opslaan',
        imageUrl: 'Afbeelding Url',

        errorInsertPrice: 'Voer een geldige prijs in',
        errorInsertStockCount: 'Voer een geldige stock count in',
        errorInsertCategory: 'Voer een geldige category in',

        successEditProduct: 'Product successvol aangepast',
        errorEditProduct: 'Er ging iets mis bij het aanpassen van het product: code {c}',

        addProductPage: 'Product aanmaken',
        addProduct: 'Maak een product aan',

        successAddProduct: 'Product successvol aangemaakt',
        errorAddProduct: 'Er ging iets mis bij het aanmaken van het product: code {c}',

    })
