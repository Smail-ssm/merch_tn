import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../../../entities/products/products.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../../entities/products/service/products.service';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() productId!: number; // Receive product id
  product!: IProducts | null;
  @Output() viewDetailsEvent = new EventEmitter<IProducts>();
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    // Fetch product details based on id
    if (this.productId) {
      this.productsService.find(this.productId).subscribe(
        product => {
          this.product = product.body;
        },
        error => {
          console.error('Error fetching product details:', error);
        },
      );
    }
  }

  viewDetails(): void {
    // @ts-ignore
    this.viewDetailsEvent.emit(this.product);
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
