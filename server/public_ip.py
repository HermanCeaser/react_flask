import re
import socket
import subprocess
from typing import Tuple

ENDPOINT = ""


def get_public_ip(port) -> Tuple[str, str, str]:
    """
    Command to get public_ip address of host machine and endpoint domain
    Returns
    -------
    my_public_ip : str
        Ip address string of host machine.
    end_point_ip_address : str
        Ip address of endpoint domain host.
    end_point_domain : str
        domain name of endpoint.

    """
    # bash_command = """host myip.opendns.com resolver1.opendns.com | \
    #     grep "myip.opendns.com has" | awk '{print $4}'"""
    # bash_command = """curl ifconfig.co"""
    # bash_command = """curl ifconfig.me"""
    bash_command = """curl icanhazip.com"""
    my_public_ip = subprocess.getoutput(bash_command)
    my_public_ip = re.compile("[0-9.]{4,}").findall(my_public_ip)[0]
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(("127.0.0.1", port))
    if result == 0:
        open_port = True
    else:
        open_port = False
    return my_public_ip, open_port


def get_public_ips() -> Tuple[str, str, str]:
    """
    Command to get public_ip address of host machine and endpoint domain
    Returns
    -------
    my_public_ip : str
        Ip address string of host machine.
    end_point_ip_address : str
        Ip address of endpoint domain host.
    end_point_domain : str
        domain name of endpoint.

    """
    # bash_command = """host myip.opendns.com resolver1.opendns.com | \
    #     grep "myip.opendns.com has" | awk '{print $4}'"""
    # bash_command = """curl ifconfig.co"""
    # bash_command = """curl ifconfig.me"""
    bash_command = """ curl icanhazip.com"""
    my_public_ip = subprocess.getoutput(bash_command)
    my_public_ip = re.compile("[0-9.]{4,}").findall(my_public_ip)[0]
    end_point_domain = (
        ENDPOINT.replace("https://", "").replace("http://", "").replace("/", "")
    )
    end_point_ip_address = socket.gethostbyname(end_point_domain)
    return my_public_ip, end_point_ip_address, end_point_domain


def set_etc_host(ip_address: str, domain: str) -> str:
    """
    A function to write mapping of ip_address and domain name in /etc/hosts.
    Ref: https://stackoverflow.com/questions/38302867/\
        how-to-update-etc-hosts-file-in-docker-image-during-docker-build

    Parameters
    ----------
    ip_address : str
        IP address of the domain.
    domain : str
        domain name of endpoint.

    Returns
    -------
    str
        Message to identify success or failure of the operation.

    """
    bash_command = """echo "{}    {}" >> /etc/hosts""".format(ip_address, domain)
    output = subprocess.getoutput(bash_command)
    return output


if __name__ == "__main__":
    my_public_ip, open_port = get_public_ip(443)
    print("Public IP address: {}\n Open port: {}".format(my_public_ip, open_port))
    my_public_ip, end_point_ip_address, end_point_domain = get_public_ips()
    print(
        "my_public_ip: {}, end_point_ip_address: {}, end_point_domain: {}".format(
            my_public_ip, end_point_ip_address, end_point_domain
        )
    )
    output = set_etc_host(ip_address=end_point_ip_address, domain=end_point_domain)
    print("Saved Ip path in /etc/hosts: ", output)
