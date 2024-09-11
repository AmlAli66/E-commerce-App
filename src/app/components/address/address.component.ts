import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  cartId: string = ""
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrderService = inject(OrderService)
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  address: FormGroup = new FormGroup(
    {
      details: new FormControl(null),
      phone: new FormControl(null),
      city: new FormControl(null),
    }
  )

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id')!
      }
    })

  }


  payment = () => {
    console.log(this.address.value);

    this._OrderService.createSession(this.cartId, this.address.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
}
