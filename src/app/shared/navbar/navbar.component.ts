import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    window.location.reload();
  }

  get isLogged(): boolean {
    return (
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != undefined
    );
  }

  get isInLoginComponent(): boolean {
    const url = this.router.url.split('/');
    if (url[1] == 'login') {
      return true;
    }
    return false;
  }
}
