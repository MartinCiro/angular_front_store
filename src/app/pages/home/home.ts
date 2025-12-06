import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '@components/blog-card/blog-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  blogPosts = [
    {
      id: 1,
      title: "DIY & Crafts",
      description: "Unleash your creativity with our fun and easy DIY squishy projects!",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKwObVXS73q1Qioa15V2Rjy996BkQd14yy6MHL11-7g3soL58C0WmjKwIjeuFA_bv112G9GrmhhAljEfxgWT7kaRos19mL2hVpfd2243sg1daS09Wpzf8Gha2Ff8l49d--lCcE2tzX_jdbtQHnpKX_S22WBYYlC_JuEe29RqXnebAgyHlztVjq0YUfcgfmHrgQFbCr_byyxMz60pkvraAcNmZs-hy3dn_ZV1T2AC9B8QhVAqNYRS8FdLB52K3arnE4kxPWhgajgOE",
      category: "DIY"
    },
    {
      id: 2,
      title: "Collector's Corner",
      description: "Dive into the world of rare finds and limited edition squishies.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs6A0ydCkwWj1WQ8QnavTtjnJ0hN08pHEOABDiYlwfC5rFMC4VCu1G-yBNN-GGLKXv51lvv35kqaxeXrcs0sEYYAWlzaXu_aTNRiZTufV6j-LE_8dFGTT2in-BTAXMhk8_fs4gHX4t74cfPxtf_hUzumua2KCcTDSsfGaJXUKSx1D8nxE14LacGSWnpRQPk1lYjIB07ZknHN8TGkoWNxZFUFb9q1GWmxdslVGsKAx58WLNWfroey-BU5EoesJyYCEAH8nbcWFRBJU",
      category: "Collecting"
    },
    {
      id: 3,
      title: "Community Events",
      description: "Join our meetups, trade events, and connect with fellow enthusiasts.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_XoXhlLQxWhseYp4EIk0vjIuY-onPwkF9aPBMvjlEt9wQZuqICIg9ytIFsv14KZtsTxYvSz2dxdcq3WCe0KmIpEjh7qB6z19KbmSpxQg0n0HR8ombbK1ZcDMpz7QkbR-oleKVzbkhXzQOmRMR0g91IfIeWxE3RHPVWdUz-qYl90uRPfK_lbO3c__-uBa5SSPGJxOctCEJ9vR-FdMfRbXVpcrMF2JieOfQqkx-aYO_3bOp56auEJHe7HCYL4Dm0r23xz2xf0CSP-M",
      category: "Events"
    },
    {
      id: 4,
      title: "Behind the Scenes",
      description: "See how your favorite squishies are designed and brought to life.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbw13wqJVD9ZjxpQ1FNFHWnt8SWn2B7zUeprCwR6W844AMrtn5k7Upzgo97e8U6bu15gqoh_9SGyx36dWxTsv2yRB88zDkjPvW_Ya7i2SrHmtq32nxODJjazwCfqjN91XWuYDvkxJXNycpsl_T3PiVy_iyIDE1vrTTZscslIZTSKX9tlfn7jrHnHbQwzFilLtWWpOk-irtB8O49czyi6a2PO5h9ufNAqlMOXI0CLv1nIiO4ZPrjnUzgKoK9kuHNiz_zBCc4wcLuKc",
      category: "Production"
    }
  ];
}