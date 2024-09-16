# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines in the history. See bash(1) for more options
# ... or force ignoredups and ignorespace
HISTCONTROL=ignoredups:ignorespace



#To print colors with print
#i.e: print $CUNDERLINE\bonjour$CEND
CBOLD=$'\033[1m'
CITALIC=$'\033[3m'
CUNDERLINE=$'\e[1;4m'
CRED=$'\e[1;31m'
CGREEN=$'\e[1;32m'
CYELLOW=$'\e[1;33m'
CBLUE=$'\e[1;34m'
CMAGENTA=$'\e[1;35m'
CCYAN=$'\e[1;36m'
CEND=$'\e[0m'

CEND=$'\e[1;0m'
CU=$'\e[1;4m'
CRED=$'\e[1;31m'
CGREEN=$'\e[1;32m'
CYELLOW=$'\e[1;33m'
CBLUE=$'\e[1;34m'
CVIOLET=$'\e[1;35m'
CTURKISH=$'\e[1;36m'
CWHITE=$'\e[1;37m'
CBLACK=$'\e[1;30m'
CGRAY=$'\e[1;90m'



# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=10000
HISTFILESIZE=20000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1="\[\033[0;31m\]\342\224\214\342\224\200\$([[ \$? != 0 ]] && echo \"[\[\033[0;31m\]\342\234\227\[\033[0;37m\]]\342\224\200\")[$(if [[ ${EUID} == 0 ]]; then echo '\[\033[01;31m\]root\[\033[01;33m\]@\[\033[01;96m\]\h'; else echo '\[\033[0;39m\]\u\[\033[01;33m\]@\[\033[01;96m\]\h'; fi)\[\033[0;31m\]]\342\224\200[\[\033[0;32m\]\w\[\033[0;31m\]]\n\[\033[0;31m\]\342\224\224\342\224\200\342\224\200\342\225\274 \[\033[0m\]\[\e[01;33m\]\\$\[\e[0m\]"
    #PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1="\[\033[0;31m\]\342\224\214\342\224\200\$([[ \$? != 0 ]] && echo \"[\[\033[0;31m\]\342\234\227\[\033[0;37m\]]\342\224\200\")[$(if [[ ${EUID} == 0 ]]; then echo '\[\033[01;31m\]root\[\033[01;33m\]@\[\033[01;96m\]\h'; else echo '\[\033[0;39m\]\u\[\033[01;33m\]@\[\033[01;96m\]\h'; fi)\[\033[0;31m\]]\342\224\200[\[\033[0;32m\]\w\[\033[0;31m\]]\n\[\033[0;31m\]\342\224\224\342\224\200\342\224\200\342\225\274 \[\033[0m\]\[\e[01;33m\]\\$\[\e[0m\]"
    #PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\033[0;31m\]\342\224\214\342\224\200\$([[ \$? != 0 ]] && echo \"[\[\033[0;31m\]\342\234\227\[\033[0;37m\]]\342\224\200\")[$(if [[ ${EUID} == 0 ]]; then echo '\[\033[01;31m\]root\[\033[01;33m\]@\[\033[01;96m\]\h'; else echo '\[\033[0;39m\]\u\[\033[01;33m\]@\[\033[01;96m\]\h'; fi)\[\033[0;31m\]]\342\224\200[\[\033[0;32m\]\w\[\033[0;31m\]]\n\[\033[0;31m\]\342\224\224\342\224\200\342\224\200\342\225\274 \[\033[0m\]\[\e[01;33m\]\\$\[\e[0m\]"
    #PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# some more ls aliases
alias timestamp='date +"%Y-%m-%d_%H-%M-%S"'
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

lsblkf(){
    { #try
        lsblk -o NAME,LABEL,FSTYPE,FSAVAIL,SIZE,MOUNTPOINTS,UUID 2> /dev/null | grep -iv -E "^loop" #on newer linux
    } || { #except
        lsblk -o NAME,LABEL,FSTYPE,FSAVAIL,SIZE,MOUNTPOINT,UUID | grep -iv -E \"^loop\"
    }
}

function pipsearch(){
    python3 -m pypisearch "$1" | sort | grep -i --color=always -E "|$1" | cgrep -c green,green -l \\[installed.*\\],'\n'
    # $HOME/.zsh/acs3.py pip $1
    # python3 -m pypisearch $1 | sort | grep -i -E "$1|"
}

#alias -p G='| egrep --color=always '

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

alias clc='clear && echo -en "\e[3J"' #clear console output
alias untar="tar -xvf"
alias txtSearch='grep --color=always -rni ./ -e '
alias verynice='/usr/bin/nice -n 19 /usr/bin/ionice -c2 -n7 ' #launch an application with very low cpu/hdd priority
alias nicest='/usr/bin/nice -n 19 /usr/bin/ionice -c2 -n7 ' #launch an application with very low cpu/hdd priority
alias nicer='/usr/bin/nice -n 9 /usr/bin/ionice -c2 -n3 '
alias tree='tree --dirsfirst'
alias dirdiff='diff -r'

#dd='dd status=progress '
mktree(){
    tree -C $@ | less -R
}

acs(){
    apt-cache search $1 | grep -i -E "$1|"
}

dockerls(){
        echo "$CUNDERLINE$CBLUE""docker ps -a .... ""$CEND"
        #docker ps -a
        docker ps -a  --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.State}}\t{{.RunningFor}}\t{{.Networks}}\t{{.Ports}}\t{{.Mounts}}\t" | grep -i -E "exited|"
        echo "$CUNDERLINE$CBLUE""docker images ... ""$CEND"
        dangling=`docker images -f "dangling=true" -q`
        docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}\t{{.Digest}}" | grep -E "$dangling|"
        #echo "$CUNDERLINE$CBLUE""dangling docker images""$CEND"
        echo "$CUNDERLINE$CBLUE""docker network ls""$CEND"
        docker network ls
        echo "$CUNDERLINE$CBLUE""docker volume ls""$CEND"
        docker volume ls
}

dus(){
     case $# in
         0*)
            print "this is an alias for ""$CUNDERLINE"'ls -A | while read file; do du -sh "$file"& done | sort -h;'"$CEND"
            #du -hs --time * | sort -h
            #du -hs --time .[^.]* * | sort -h
            #du -hs --time $(ls -A) | sort -h
            ls -A | while read file; do du -sh "$file"& done | sort -h;
         ;;
         *)
            print "this is an alias for ""$CUNDERLINE""du -hs --time $@ | sort -h""$CEND"
            du -hs --time $@ | sort -h
         ;;
    esac
}

llocate(){
    locate -i --regex $1 | grep "`pwd -P`" | grep -i $1
}

ffind()
{
    #TODO: il faudrait trouver un moyen de ne pas filtrer le grep sur le pwd, mais qd même mettre le pwd dans la sortie
    # find a file in current directory that contains up-to the 3 strings given case insensitive
    # example:
    # 	ffind bla #search for a file whose name contains "bla"
    # 	ffind bla py asdf #search for a file that contains these 3 strings: bla, py and asdf
    case $# in
        0*)
            print -P '%B%F{red}__Pas assez de paramètres:__%f%b'
            echo ""
            ;;
        1*)
            # find "`pwd -P`" -iname "*$1*"  2> /dev/null | grep -i -E "$1"			;;
            find "`pwd -P`" -iregex ".*$1.*"  2> /dev/null | grep -i -E "$1"			;;
        2*)
            find "`pwd -P`" -iregex ".*$1.*"  2> /dev/null | grep -i -E "$1.*$2|$2.*$1"			;;
        3*)
            find "`pwd -P`" -iregex ".*$1.*"  2> /dev/null | grep -i -E "$1.*$2.*$3|$2.*$1.*$3|$3.*$1.*$2|$1.*$3.*$2|$2.*$3.*$1|$3.*$2.*$1" ;;
        *)
            echo "trop de paramètres en entrée"
    esac
}


pdftxtSearch()
{
    # Search for some text in all the pdf in current directory
    # pdftxtSearch bonjour #search for "bonjour" in all the pdf
    case $# in
        0*)
            echo "__Pas assez de paramètres:__"
            echo ""
            echo "pdftxtSearch *STR1*[[&& *STR2*] [&& *STR3*]]"
            ;;
        1*)
            pdfgrep -HiRn $1 ./ ;;
        2*)
            pdfgrep -HiRn  $1 * | grep --color=always -i -E "$1.*$2" ;;
        *)
            echo "trop de paramètres"
    esac
}

waitforpid(){
    tail --pid=$1 -f /dev/null
}


py39(){
# source ~/venv_py39/bin/activate  # commented out by conda initialize
    alias pip='python3.9 -m pip'
    export PATH=~"~/venv_py39/bin/:$PATH"
    alias ipyy='py39  ; ipython3 --no-banner '
}


if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    . /etc/bash_completion
fi


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion



host_username="unipig"
password1="rootROOT1."
username1="unilecticvperso1"
password2="rootROOT1."
username2="unilecticvbig"
vperso1_sqlfile="/var/www/html/UniLectin3D_new.sql"
vbig_sqlfile="/var/www/html/Unilecticvbig_new.sql"
port="8080"
#folder_DEPLOY="/home/$host_username/DEPLOY"
#sudo cp 000-unilectin.conf /etc/httpd/conf.d/000-unilectin.conf




