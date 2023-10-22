# Define a function to extract Albanian vocabulary words
from typing import List

FILE_PATH = "dict-german-albanian-words.txt"


def extract_albanian_word_from_line(line) -> str:
    parts = line.split("\t")
    if len(parts) >= 2:
        albanian_word = parts[1]
        return albanian_word.strip()
    return ""


def write_new_file(words: List[str]):
    with open("fjale.txt", "w") as f:
        for w in words:
            f.write(f"{w}\n")


def length_albanian_word(w: str) -> int:
    transformed_word = (
        w.lower()
        .replace("dh", "_")
        .replace("gj", "_")
        .replace("ll", "_")
        .replace("nj", "_")
        .replace("rr", "_")
        .replace("sh", "_")
        .replace("th", "_")
        .replace("xh", "_")
        .replace("zh", "_")
    )
    return len(transformed_word)


def extract_albanian_words_length_5(file_path: str) -> None:
    with open(file_path) as f:
        lines = [line for line in f]
        albanian_entry = [
            extract_albanian_word_from_line(line)
            for line in lines
            if extract_albanian_word_from_line(line) is not None
        ]
        albanian_words = [w.split(" ")[0] for w in albanian_entry]
        albanian_words_length_5 = [
            w.lower()
            for w in albanian_words
            if length_albanian_word(w) == 5 and not w.startswith("(") and not "!" in w and "." not in w
        ]
        unique_words = list(set(albanian_words_length_5))
        write_new_file(unique_words)


if __name__ == "__main__":
    extract_albanian_words_length_5(FILE_PATH)
