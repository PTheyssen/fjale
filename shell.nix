{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    # nativeBuildInputs is usually what you want -- tools you need to run
    nativeBuildInputs = with pkgs.buildPackages; [
      nodejs_20
    ];

    shellHook = ''
    alias ng='npx ng'
    npm set prefix ~/.npm-global
    '';
}
