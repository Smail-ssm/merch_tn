import { Component } from '@angular/core';
import { IProducts } from '../../../../entities/products/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SortService } from '../../../../shared/sort/sort.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsers } from '../../../../entities/users/users.model';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../product/ProductService';

@Component({
  selector: 'jhi-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent {
  products?: IProducts[];
  viewTypeIsCard = false;
  selectedProduct?: IProducts; // Track selected product
  private currentUser!: IUsers;
  // ... other properties ...
  private selectedProductId!: number;

  constructor(
    protected productsService: ProductService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');

    if (userString) {
      this.currentUser = JSON.parse(userString);
    }

    this.load();
  }

  load(): void {
    this.productsService.findByUser(this.currentUser.id).subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Error loading user products:', error);
      },
    );
  }

  toggleViewType(): void {
    this.viewTypeIsCard = !this.viewTypeIsCard;
  }

  // Function to handle checkbox change
  handleCheckboxChange(event: any, product: any) {
    // Handle checkbox change logic here
    console.log(`Checkbox for ${product.name} is ${event.target.checked ? 'checked' : 'unchecked'}`);
  }

  // Function to handle edit button click
  edit(product: any) {
    // Handle edit logic here
    console.log(`Edit button clicked for ${product.name}`);
  }

  // Function to handle delete button click
  delete(product: any) {
    // Handle delete logic here
    console.log(`Delete button clicked for ${product.name}`);
  }

  openProductModal(product: IProducts): void {
    if (product) {
      this.selectedProductId = product.id; // Set the selected product id
      const modalRef = this.modalService.open(ProductComponent, { size: 'lg' });
      modalRef.componentInstance.productId = this.selectedProductId;

      // Subscribe to close modal event
      modalRef.componentInstance.closeModalEvent.subscribe(() => {
        modalRef.close(); // Close the modal
      });
    }
  }

  protected refineData(data: IProducts[]): IProducts[] {
    return data;
  }

  protected fillComponentAttributesFromResponseBody(data: IProducts[] | null): IProducts[] {
    return data ?? [];
  }
}
