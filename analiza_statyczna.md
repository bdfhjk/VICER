Tutaj są notatki z pracy nad analizą statyczną.

Na wejściu dostaję drzewo AST dla jednostki translacyjnej. Na wyjściu mam dostarczyć:
1. Słownik funkcji.
2. Globalne środowisko.

Globalne środowisko to słownik, w którym kluczem jest nazwa, a wartością opis zmiennej.

W słowniku funkcji kluczem jest jej nazwa, a wartością opis, zawierający:
- typ zwracany
- argumenty
- środowisko
- CFG

CFG składa się z klocków, po których przechodzi się albo dodając do wartości etykiety jeden albo przechodząc do wierzchołka w polu "next". Typy klocków są znane.

Wyróżniliśmy kilka faz produkcji wyniku.

Pierwsza faza to wejście do każdej funkcji i bloku i podmiana identyfikatorów na unikalne identyfikatory oraz zapisanie sobie wystąpień tychże. W słowniku dla danej nazwy identyfikatora musi być podany jego typ. Dla nazwy funkcji natomiast musi być lista identyfikatorów zarówno z tej funkcji, jak i z jej podbloków. Jeżeli, oczywiście, jest odwołanie do nazwy globalnej, to podmieniam na globalną.

W drugiej fazie przechodzę wszystkie instrukcje, patrząc, czy dostęp do zmiennej jest zawsze po deklaracji.

W trzeciej fazie przechodzę instrukcje każdej funkcji, rozwijając je do mini-grafów CFG i łącząc ze sobą.

Po wykonaniu wszystkich trzech faz mogę przekazać wynik wirtualnej maszynie.

W przyszłości, w CFG będzie podane, do którego fragmentu kodu pisanego się odnosi. Tak samo, każdy identyfikator będzie miał przypisany swój identyfikator dla użytkownika(np. __MAIN_N będzie pamiętał, że nazywa się N) oraz miejsce w kodzie, w którym został zadeklarowany.

===

Na początku muszę stworzyć stuba.

Drugim moim zadaniem będzie założenie co do postaci AST, które otrzymam. Będę się wzorował na AST wyrzucanym przez Clanga.