import { MLanguage } from 'vue-multilanguage';

export default
    new MLanguage('Nederlands').create({

        homePage: 'Home pagina',
        homeTitle: 'Hoi {0}!',
        homeGreeting: 'Welkom bij de producten winkel!',

        productPage: 'Producten pagina',
        productCategory: 'Producten voor de categorie: {c}',
        productsAll: 'Alle producten',
        NoProductsFound: 'Geen producten gevonden voor deze categorie',

        scrollToTop: 'naar boven scrollen',

        description: 'Beschrijving',
        addToCart: 'Aan winkelwagen toevoegen',
        details: 'Details',
        inStock: '{s} in de voorraad',
        outOfStock: 'Geen op voorraad!',
        notEnoughInStock: 'Niet genoeg van dit product in de voorraad',
        review: '{r} review',
        reviews: '{r} reviews',

        onPage: 'Momenteel op pagina {p} van {m}',

        noItemsInCart: 'Je hebt momenteel geen producten in je winkelwagen',
        itemsInCart: 'Je winkelwagen bevat {p} producten',
        itemInCart: 'Je winkelwagen bevat 1 product',

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
        loginFailed: 'Niet in staat om in te loggen',
        logout: 'Uitloggen',

        viewAll: 'Bekijk alle',
        categories: 'categorieën {0}',

        products: 'Producten',

        changeLanguage: 'Verander van taal',

        result: '1 resultaat voor {q}',
        results: '{r} resultaten voor {q}',
        noResults: 'Geen resultaten voor {q}',

        notFound: 'Niet gevonden',
        unableToFind: 'Het pad {p} is niet gevonden',
        home: 'Home',
        goBack: 'Ga terug',

        search: 'Zoeken',
        suggestions: 'Suggesties',
        searchedBefore: 'Je zocht eerder',
        searchFor: 'Zoek voor...',

        successSendEmail: 'Een email is successvol verstuurd naar het emailaddress die behoort bij uw account',
    })
