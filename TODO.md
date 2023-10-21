# TODOs

- problem currently "dh" is treated as two characters in the word list,
  so vadhe is considered of length 5, but if the keyboard has dh has a separate
  key then we need to treat them special while filtering (consider them as one char):
  - dh
  - gj
  - ll
  - nj
  - rr
  - sh
  - th
  - xh
  - zh
