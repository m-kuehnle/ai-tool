import random
import pyperclip  # type: ignore

def randomZeichen(w, l):
    längeString = ''
    for i in range(l):
        index = random.randint(0, len(w)-1)
        längeString += w[index]
    return längeString


wörter = ['hallo ', 'welt ', 'python ', 'programmieren ']
längeUser = int(input('Wie lang soll die Zeichenkette sein? '))
res = randomZeichen(wörter, längeUser)
print("Die generierte Zeichenkette lautet:")
print(res)




bestätigung = input("Möchten Sie die Zeichenkette in die Zwischenablage kopieren? (Ja/Nein): ")
if bestätigung.lower() == "ja":
    pyperclip.copy(res)
    print("Die Zeichenkette wurde in die Zwischenablage kopiert.")

else:
    print("Die Zeichenkette wurde nicht in die Zwischenablage kopiert.")
